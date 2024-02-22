import {
  HTTP_REQUEST_PUBLIC_BASE_URL,
  PUBLIC_DRIVE_REQUEST_PREFIX,
} from "@illa-public/illa-net"
import { EXPIRATION_TYPE, UPLOAD_FILE_STATUS } from "@illa-public/public-types"
import { IMAGE_FILE_TYPE_RULES, matchRules } from "@illa-public/utils"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { FILE_ITEM_DETAIL_STATUS_IN_UI } from "@/page/App/Module/UploadDetail/components/DetailList/interface"
import {
  fetchBatchAnonymousGenerateTinyUrl,
  fetchGenerateTinyUrl,
} from "@/services/drive"
import {
  getUploadToDriveSingedURL,
  updateFilesToDrive,
  updateFilesToDriveStatus,
} from "@/utils/drive/upload/getSingedURL"
import { CAMERA_MODE, FileInfo } from "./interface"

type TimerId = ReturnType<typeof setTimeout>
export const setInternalByTimeout = (
  callback: () => void,
  interval: number,
) => {
  let startTime = Date.now()
  let timerId: TimerId
  const deviation = 50
  function run() {
    const expected = startTime + interval
    const drift = Date.now() - expected
    if (drift > deviation) {
      startTime = Date.now() + drift
    } else {
      startTime += interval
    }
    callback()
    timerId = setTimeout(run, Math.max(0, interval - drift))
  }
  timerId = setTimeout(run, interval)
  return () => {
    clearTimeout(timerId)
  }
}

export const uploadFileToDrive = async (
  needUploadFile: File,
  fileOptions: {
    allowAnonymous: boolean
    folder: string
    replace: boolean
  },
  abortSignal: AbortSignal,
) => {
  const message = createMessage()
  const { allowAnonymous, folder, replace } = fileOptions
  try {
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
    const uploadResult = await updateFilesToDrive(
      uploadURLResponse.url,
      needUploadFile,
      undefined,
      abortSignal,
    )
    await updateFilesToDriveStatus(
      allowAnonymous,
      uploadURLResponse.fileID,
      uploadResult,
    )
    if (uploadResult === UPLOAD_FILE_STATUS.COMPLETE) {
      message.success({
        content: i18n.t("editor.inspect.setter_message.uploadsuc"),
      })
      return {
        id: uploadURLResponse.fileID,
        name: uploadURLResponse.fileName,
      }
    } else {
      message.error({
        content: i18n.t("editor.inspect.setter_message.uploadfail"),
      })
    }
  } catch (e) {
    message.error({
      content: i18n.t("editor.inspect.setter_message.uploadfail"),
    })
    throw e
  }
}

export const handleGetValueAfterUpload = async (
  targetFileName: string,
  files: FileInfo[],
  fileID: string,
  appID: string,
  allowAnonymousUse?: boolean,
) => {
  const currentValue = [...files]
  const targetIndex = currentValue.findIndex(
    (item) => item.fileName === targetFileName,
  )
  if (targetIndex !== -1) {
    let targetNode = currentValue[targetIndex]
    currentValue.splice(targetIndex, 1)
    const requestParams = {
      ids: [fileID],
      expirationType: EXPIRATION_TYPE.PERSISTENT,
      hotlinkProtection: false,
    }
    const tinyURLRes = allowAnonymousUse
      ? await fetchBatchAnonymousGenerateTinyUrl(appID, requestParams)
      : await fetchGenerateTinyUrl(requestParams)
    const data = Array.isArray(tinyURLRes.data)
      ? tinyURLRes.data[0]
      : tinyURLRes.data
    let tinyURL = `${HTTP_REQUEST_PUBLIC_BASE_URL}${PUBLIC_DRIVE_REQUEST_PREFIX}/${data.tinyURL}`
    targetNode = {
      ...targetNode,
      fileID: fileID,
      driveUploadStatus: FILE_ITEM_DETAIL_STATUS_IN_UI.SUCCESS,
      tinyURL,
    }
    currentValue.splice(targetIndex, 0, targetNode)
  }
  return currentValue
}

export const getCurrentItemInputType = (contentType?: string) => {
  if (!contentType || matchRules(IMAGE_FILE_TYPE_RULES, contentType)) {
    return CAMERA_MODE.PHOTO
  } else {
    return CAMERA_MODE.VIDEO
  }
}
