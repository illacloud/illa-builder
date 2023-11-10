export enum FILE_ITEM_DETAIL_STATUS_IN_UI {
  PROCESSING = "processing",
  SUCCESS = "success",
  ERROR = "error",
  WAITING = "waiting",
}

export interface FileItemDetailProps {
  loaded: number
  total: number
  status: FILE_ITEM_DETAIL_STATUS_IN_UI
  fileName: string
  contentType: string
  queryID: string
  abortController?: AbortController
  onDelete: (queryID: string, status: FILE_ITEM_DETAIL_STATUS_IN_UI) => void
  onRetry: (queryID: string) => void
}
