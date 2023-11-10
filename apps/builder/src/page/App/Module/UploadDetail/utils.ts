import { FILE_ITEM_DETAIL_STATUS_IN_UI } from "./components/DetailList/interface"
import { FileDetailInfos } from "./store/interface"

export const getSuccessFiles = (files: FileDetailInfos[]) => {
  return files.filter(
    (file) => file.status === FILE_ITEM_DETAIL_STATUS_IN_UI.SUCCESS,
  )
}

export const getFailedFiles = (files: FileDetailInfos[]) => {
  return files.filter(
    (file) => file.status === FILE_ITEM_DETAIL_STATUS_IN_UI.ERROR,
  )
}

export const getProcessingFiles = (files: FileDetailInfos[]) => {
  return files.filter(
    (file) => file.status === FILE_ITEM_DETAIL_STATUS_IN_UI.PROCESSING,
  )
}

export const getWaitingFiles = (files: FileDetailInfos[]) => {
  return files.filter(
    (file) => file.status === FILE_ITEM_DETAIL_STATUS_IN_UI.WAITING,
  )
}

export const getAreaStatues = (files: FileDetailInfos[]) => {
  const finishedFiles = [...getFailedFiles(files), ...getSuccessFiles(files)]
  const readyFiles = [...getWaitingFiles(files), ...getProcessingFiles(files)]
  const isFinished =
    finishedFiles.length > 0 && finishedFiles.length === files.length
  const isReady = readyFiles.length > 0
  if (isFinished) {
    return "success"
  }
  if (isReady) {
    return "processing"
  }
  return "initial"
}
