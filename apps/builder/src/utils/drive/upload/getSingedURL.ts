import { ERROR_FLAG } from "@illa-public/illa-net"
import {
  DRIVE_FILE_TYPE,
  GCS_OBJECT_TYPE,
  UPLOAD_FILE_DUPLICATION_HANDLER,
  UPLOAD_FILE_STATUS,
} from "@illa-public/public-types"
import {
  CollarModalType,
  handleCollaPurchaseError,
} from "@illa-public/upgrade-modal"
import axios from "axios"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { FILE_ITEM_DETAIL_STATUS_IN_UI } from "@/page/App/Module/UploadDetail/components/DetailList/interface"
import { updateFileDetailStore } from "@/page/App/Module/UploadDetail/store"
import { ILLARoute } from "@/router"
import {
  fetchFileList,
  fetchGetUploadFileURL,
  fetchUpdateFileStatus,
  fetchUploadFilesStatusAnonymous,
  fetchUploadFilesToAnonymous,
} from "@/services/drive"
import { isILLAAPiError } from "@/utils/typeHelper"

export enum GET_SINGED_URL_ERROR_CODE {
  NOT_HAS_ROOT_FOLDER = "NOT_HAS_ROOT_FOLDER",
  UPLOAD_FAILED = "UPLOAD_FAILED",
}

const message = createMessage()

export const getUploadToDriveSingedURL = async (
  allowAnonymous: boolean,
  folderPath: string,
  fileInfo: {
    fileName: string
    size: number
    contentType: string
    replace: boolean
  },
  abortSignal?: AbortSignal,
) => {
  if (!allowAnonymous) {
    try {
      const fileList = await fetchFileList(
        {
          path: "/root",
          type: DRIVE_FILE_TYPE.MIX,
        },
        abortSignal,
      )
      if (!fileList.data.currentFolderID)
        throw new Error(GET_SINGED_URL_ERROR_CODE.UPLOAD_FAILED)
      const singedURLResponse = await fetchGetUploadFileURL(
        {
          name: folderPath
            ? `${folderPath}/${fileInfo.fileName}`
            : fileInfo.fileName,
          type: GCS_OBJECT_TYPE.FILE,
          contentType: fileInfo.contentType,
          size: fileInfo.size,
          folderID: fileList.data.currentFolderID,
          duplicationHandler: fileInfo.replace
            ? UPLOAD_FILE_DUPLICATION_HANDLER.COVER
            : UPLOAD_FILE_DUPLICATION_HANDLER.RENAME,
        },
        abortSignal,
      )
      return {
        url: singedURLResponse.data.url,
        fileID: singedURLResponse.data.id,
        fileName: singedURLResponse.data.name,
      }
    } catch (e) {
      if (isILLAAPiError(e)) {
        return Promise.reject(e)
      }
      throw new Error(GET_SINGED_URL_ERROR_CODE.UPLOAD_FAILED)
    }
  } else {
    try {
      const appID = ILLARoute.state.matches[0].params.appId
      if (typeof appID !== "string")
        throw new Error(GET_SINGED_URL_ERROR_CODE.UPLOAD_FAILED)

      const singedURLResponse = await fetchUploadFilesToAnonymous(
        appID,
        {
          name: fileInfo.fileName,
          type: GCS_OBJECT_TYPE.FILE,
          contentType: fileInfo.contentType,
          size: fileInfo.size,
          duplicationHandler: fileInfo.replace
            ? UPLOAD_FILE_DUPLICATION_HANDLER.COVER
            : UPLOAD_FILE_DUPLICATION_HANDLER.RENAME,
        },
        abortSignal,
      )
      return {
        url: singedURLResponse.data.url,
        fileID: singedURLResponse.data.id,
        fileName: singedURLResponse.data.name,
      }
    } catch (e) {
      if (isILLAAPiError(e)) {
        return Promise.reject(e)
      }
      throw new Error(GET_SINGED_URL_ERROR_CODE.UPLOAD_FAILED)
    }
  }
}

export const updateFilesToDrive = async (
  url: string,
  uploadFile: File,
  processCall?: (loaded: number) => void,
  abortSignal?: AbortSignal,
) => {
  try {
    const openUploadLink = await axios.post(url, null, {
      headers: {
        "x-goog-resumable": "start",
        "Content-Type": uploadFile.type,
      },
      withCredentials: false,
      signal: abortSignal,
    })
    if (openUploadLink.headers.location) {
      await axios.put(openUploadLink.headers.location, uploadFile, {
        headers: {
          "Content-Type": uploadFile.type,
        },
        withCredentials: false,
        signal: abortSignal,
        onUploadProgress: (progressEvent) => {
          if (processCall) processCall(progressEvent.loaded)
        },
      })
      return Promise.resolve(UPLOAD_FILE_STATUS.COMPLETE)
    }
    return Promise.resolve(UPLOAD_FILE_STATUS.FAILED)
  } catch (e) {
    return Promise.resolve(UPLOAD_FILE_STATUS.FAILED)
  }
}

export const updateFilesToDriveStatus = async (
  allowAnonymous: boolean,
  fileID: string,
  uploadFileStatus: UPLOAD_FILE_STATUS,
) => {
  if (!allowAnonymous) {
    await fetchUpdateFileStatus(fileID, uploadFileStatus)
  } else {
    const appID = ILLARoute.state.matches[0].params.appId
    if (typeof appID !== "string") return
    await fetchUploadFilesStatusAnonymous(appID, fileID, uploadFileStatus)
  }
}

export const uploadFileToDrive = async (
  queryID: string,
  needUploadFile: File,
  fileOptions: {
    allowAnonymous: boolean
    folder: string
    replace: boolean
  },
  abortSignal: AbortSignal,
) => {
  const { allowAnonymous, folder, replace } = fileOptions
  try {
    updateFileDetailStore.updateFileDetailInfo(queryID, {
      loaded: 0,
      total: needUploadFile.size,
      status: FILE_ITEM_DETAIL_STATUS_IN_UI.WAITING,
    })
    const uploadURLResponse = await getUploadToDriveSingedURL(
      allowAnonymous,
      folder,
      {
        fileName: needUploadFile.name,
        size: needUploadFile.size,
        contentType: needUploadFile.type,
        replace,
      },
      abortSignal,
    )

    updateFileDetailStore.updateFileDetailInfo(queryID, {
      loaded: 0,
      total: needUploadFile.size,
      status: FILE_ITEM_DETAIL_STATUS_IN_UI.PROCESSING,
    })

    const processCallback = (loaded: number) => {
      updateFileDetailStore.updateFileDetailInfo(queryID!, {
        loaded: loaded,
        status: FILE_ITEM_DETAIL_STATUS_IN_UI.PROCESSING,
      })
    }
    const uploadResult = await updateFilesToDrive(
      uploadURLResponse.url,
      needUploadFile,
      processCallback,
      abortSignal,
    )
    await updateFilesToDriveStatus(
      allowAnonymous,
      uploadURLResponse.fileID,
      uploadResult,
    )
    if (uploadResult === UPLOAD_FILE_STATUS.COMPLETE) {
      updateFileDetailStore.updateFileDetailInfo(queryID, {
        status: FILE_ITEM_DETAIL_STATUS_IN_UI.SUCCESS,
      })
      message.success({
        content: i18n.t("editor.inspect.setter_message.uploadsuc"),
      })
      return {
        id: uploadURLResponse.fileID,
        name: uploadURLResponse.fileName,
      }
    } else {
      updateFileDetailStore.updateFileDetailInfo(queryID, {
        status: FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
      })
      message.error({
        content: i18n.t("editor.inspect.setter_message.uploadfail"),
      })
    }
  } catch (e) {
    updateFileDetailStore.updateFileDetailInfo(queryID, {
      status: FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
    })
    const res = handleCollaPurchaseError(e, CollarModalType.STORAGE)
    if (res) return
    if (isILLAAPiError(e)) {
      if (e.data.errorMessage === ERROR_FLAG.ERROR_FLAG_OUT_OF_USAGE_VOLUME) {
        message.error({
          content: i18n.t("editor.inspect.setter_message.noStorage"),
        })
        return
      }
    }
    message.error({
      content: i18n.t("editor.inspect.setter_message.uploadfail"),
    })
  }
}
