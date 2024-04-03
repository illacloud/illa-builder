import { isILLAAPiError } from "@illa-public/illa-net"
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
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { fetchDownloadURLByTinyURL } from "@/services/drive"
import store from "@/store"
import { uploadFileToDrive } from "@/utils/drive/upload/getSingedURL"
import { getContentTypeByFileExtension, getFileName } from "@/utils/file"
import { isBase64Simple } from "@/utils/url/base64"
import { dataURLtoFile } from "@/widgetLibrary/UploadWidget/util"
import { isNeedPreventForPremium } from "./premiumEventUtils"

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
  if (isNeedPreventForPremium() || !Array.isArray(downloadInfo)) {
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
        const rootState = store.getState()
        const isProductionMode = getIsILLAProductMode(rootState)
        const res = handleCollaPurchaseError(
          e,
          CollarModalType.STORAGE,
          isProductionMode
            ? "deploy_traffic_not_enough_event_handler"
            : "builder_editor_traffic_not_enough_event_handler",
        )
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
  } = params
  if (
    isNeedPreventForPremium() ||
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
  const queryID = `${fileDownloadName}_${new Date().getTime()}`

  const abortController = new AbortController()

  updateFileDetailStore.addFileDetailInfo({
    loaded: 0,
    total: 0,
    status: FILE_ITEM_DETAIL_STATUS_IN_UI.WAITING,
    fileName: fileDownloadName,
    contentType,
    queryID: queryID,
    abortController,
  })
  let needUploadFile: File | undefined
  try {
    needUploadFile = dataURLtoFile(tmpData, fileDownloadName)
    updateFileDetailStore.updateFileDetailInfo(queryID, {
      saveToILLADriveParams: {
        fileData: needUploadFile,
        allowAnonymous,
        folder,
        replace,
      },
    })
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
    await uploadFileToDrive(
      queryID,
      needUploadFile,
      {
        allowAnonymous,
        folder,
        replace,
      },
      abortController.signal,
    )
  } catch (e) {
    const rootState = store.getState()
    const isProductionMode = getIsILLAProductMode(rootState)
    handleCollaPurchaseError(
      e,
      CollarModalType.STORAGE,
      isProductionMode
        ? "deploy_storage_not_enough_event_handler"
        : "builder_editor_storage_not_enough_event_handler",
    )
  }
}
