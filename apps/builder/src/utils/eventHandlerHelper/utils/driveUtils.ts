import { ERROR_FLAG } from "@illa-public/illa-net/errorFlag"
import {
  CollarModalType,
  handleCollaPurchaseError,
} from "@illa-public/upgrade-modal"
import { Zip, ZipPassThrough } from "fflate"
import { createWriteStream } from "streamsaver"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { FILE_ITEM_DETAIL_STATUS_IN_UI } from "@/page/App/Module/UploadDetail/components/DetailList/interface"
import { updateFileDetailStore } from "@/page/App/Module/UploadDetail/store"
import { UPLOAD_FILE_STATUS, fetchDownloadURLByTinyURL } from "@/services/drive"
import {
  getUploadToDriveSingedURL,
  updateFilesToDrive,
  updateFilesToDriveStatus,
} from "@/utils/drive/upload/getSingedURL"
import { getContentTypeByFileExtension, getFileName } from "@/utils/file"
import { isILLAAPiError } from "@/utils/typeHelper"
import { isBase64Simple } from "@/utils/url/base64"
import { dataURLtoFile } from "@/widgetLibrary/UploadWidget/util"

const message = createMessage()

interface IDriveDownloadInfo {
  tinyURL: string
  fileID: string
}

interface IDownloadFromILLADriveParams {
  downloadInfo: IDriveDownloadInfo[]
  asZip?: boolean
}

export const downloadFromILLADrive = async (
  params: IDownloadFromILLADriveParams,
) => {
  const { downloadInfo, asZip = false } = params
  if (!Array.isArray(downloadInfo)) {
    return
  }
  let promise = Promise.resolve()
  const zip = new Zip()

  const zipName = `illa_drive_download_${new Date().getTime()}.zip`
  const zipReadableStream = new ReadableStream({
    start(controller) {
      zip.ondata = (error, data, final) => {
        if (error) {
          controller.error(error)
        } else {
          controller.enqueue(data)
          if (final) {
            controller.close()
          }
        }
      }
    },
  })
  if (asZip) {
    const streamsaver = createWriteStream(zipName)
    zipReadableStream.pipeTo(streamsaver)
  }

  for (let i = 0; i < downloadInfo.length; i++) {
    const { tinyURL, fileID } = downloadInfo[i]
    promise = promise.then(async () => {
      try {
        const response = await fetchDownloadURLByTinyURL(tinyURL, fileID)
        const fileInfo = response.data
        const { name, downloadURL } = fileInfo
        const fileResponse = await fetch(downloadURL)

        if (!asZip && window.WritableStream && fileResponse.body?.pipeTo) {
          const fileStream = createWriteStream(name)
          return fileResponse.body.pipeTo(fileStream)
        }

        if (asZip) {
          const zipStream = new ZipPassThrough(name)
          zip.add(zipStream)
          const fileReader = fileResponse.body?.getReader()

          while (fileReader) {
            const { value, done } = await fileReader.read()
            if (done) {
              zipStream.push(new Uint8Array(0), true)
              return Promise.resolve()
            }
            zipStream.push(value)
          }
        }
      } catch (e) {
        const res = handleCollaPurchaseError(e, CollarModalType.TRAFFIC)
        if (res) return
        if (isILLAAPiError(e)) {
          if (
            e.data.errorMessage === ERROR_FLAG.ERROR_FLAG_OUT_OF_USAGE_TRAFFIC
          ) {
            message.error({
              content: i18n.t("editor.inspect.setter_message.noTraffic"),
            })
            return Promise.reject(e)
          }
        }
        return Promise.resolve()
      }
    })
  }

  if (asZip) {
    promise.then(() => {
      zip.end()
    })
  }
}

export enum FILE_TYPE {
  AUTO = "auto",
  TEXT = "text",
  JPEG = "jpeg",
  PNG = "png",
  SVG = "svg",
  JSON = "json",
  CSV = "csv",
  TSV = "tsv",
  XLSX = "xlsx",
}

export interface ISaveToILLADriveParams {
  fileName: string
  fileData: string
  fileType: FILE_TYPE
  folder?: string
  allowAnonymous?: boolean
  replace?: boolean
  queryID?: string
}

export const saveToILLADrive = async (params: ISaveToILLADriveParams) => {
  const {
    fileName,
    fileData,
    fileType = FILE_TYPE.AUTO,
    folder = "",
    allowAnonymous = false,
    replace = false,
    queryID: paramsQueryID,
  } = params
  if (
    typeof fileName !== "string" ||
    fileData == undefined ||
    typeof fileData !== "string"
  )
    return

  message.info({
    content: i18n.t("drive.message.start_upload"),
  })
  const isBase64 = isBase64Simple(fileData)

  const fileDownloadName = getFileName((fileName ?? "").trim(), fileType)
  const contentType = getContentTypeByFileExtension(
    fileDownloadName.split(".")[1],
  )

  let tmpData = fileData
  if (!isBase64) {
    tmpData = `data:${contentType};base64,${fileData}`
  }
  let queryID = paramsQueryID
  if (!queryID) {
    queryID = `${fileDownloadName}_${new Date().getTime()}`
  }

  const abortController = new AbortController()

  if (!paramsQueryID) {
    updateFileDetailStore.addFileDetailInfo({
      loaded: 0,
      total: 0,
      status: FILE_ITEM_DETAIL_STATUS_IN_UI.WAITING,
      fileName: fileDownloadName,
      contentType,
      queryID: queryID,
      abortController,
      saveToILLADriveParams: {
        fileName,
        fileData,
        fileType,
        folder,
        allowAnonymous,
        replace,
      },
    })
  }

  let needUploadFile: File | undefined
  try {
    needUploadFile = dataURLtoFile(tmpData, fileDownloadName)
  } catch (e) {
    updateFileDetailStore.updateFileDetailInfo(queryID, {
      status: FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
    })
    message.error({
      content: i18n.t("editor.inspect.setter_message.uploadfail"),
    })
    return
  }

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
        fileName: fileDownloadName,
        size: needUploadFile.size,
        contentType: needUploadFile.type,
        replace,
      },
      abortController.signal,
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
      abortController.signal,
    )
    if (uploadResult === UPLOAD_FILE_STATUS.COMPLETE) {
      updateFileDetailStore.updateFileDetailInfo(queryID, {
        status: FILE_ITEM_DETAIL_STATUS_IN_UI.SUCCESS,
      })
      message.success({
        content: i18n.t("editor.inspect.setter_message.uploadsuc"),
      })
    } else {
      updateFileDetailStore.updateFileDetailInfo(queryID, {
        status: FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
      })
      message.error({
        content: i18n.t("editor.inspect.setter_message.uploadfail"),
      })
    }
    await updateFilesToDriveStatus(
      allowAnonymous,
      uploadURLResponse.fileID,
      uploadResult,
    )
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
