import axios from "axios"
import { ILLARoute } from "@/router"
import {
  DRIVE_FILE_TYPE,
  GCS_OBJECT_TYPE,
  UPLOAD_FILE_DUPLICATION_HANDLER,
  UPLOAD_FILE_STATUS,
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

export const getUploadToDriveSingedURL = async (
  allowAnonymous: boolean,
  folderPath: string,
  fileInfo: {
    fileName: string
    size: number
    contentType: string
    replace: boolean
  },
) => {
  if (!allowAnonymous) {
    try {
      const fileList = await fetchFileList({
        path: "/root",
        type: DRIVE_FILE_TYPE.MIX,
      })
      if (!fileList.data.currentFolderID)
        throw new Error(GET_SINGED_URL_ERROR_CODE.UPLOAD_FAILED)
      const singedURLResponse = await fetchGetUploadFileURL({
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
      })
      return {
        url: singedURLResponse.data.url,
        fileID: singedURLResponse.data.id,
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

      const singedURLResponse = await fetchUploadFilesToAnonymous(appID, {
        name: fileInfo.fileName,
        type: GCS_OBJECT_TYPE.FILE,
        contentType: fileInfo.contentType,
        size: fileInfo.size,
        duplicationHandler: fileInfo.replace
          ? UPLOAD_FILE_DUPLICATION_HANDLER.COVER
          : UPLOAD_FILE_DUPLICATION_HANDLER.RENAME,
      })
      return {
        url: singedURLResponse.data.url,
        fileID: singedURLResponse.data.id,
      }
    } catch (e) {
      if (isILLAAPiError(e)) {
        return Promise.reject(e)
      }
      throw new Error(GET_SINGED_URL_ERROR_CODE.UPLOAD_FAILED)
    }
  }
}

export const updateFilesToDrive = async (url: string, uploadFile: File) => {
  try {
    const openUploadLink = await axios.post(url, null, {
      headers: {
        "x-goog-resumable": "start",
        "Content-Type": uploadFile.type,
      },
      withCredentials: false,
    })
    if (openUploadLink.headers.location) {
      await axios.put(openUploadLink.headers.location, uploadFile, {
        headers: {
          "Content-Type": uploadFile.type,
        },
        withCredentials: false,
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
