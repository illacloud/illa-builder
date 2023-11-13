import VirtualList from "rc-virtual-list"
import { FC, useSyncExternalStore } from "react"
import { useTranslation } from "react-i18next"
import { updateFileDetailStore } from "@/page/App/Module/UploadDetail/store"
import {
  PROCESS_DETAIL_ITEM_HEIGHT,
  PROCESS_DETAIL_LIST_HEIGHT,
} from "./constants"
import { FileItemDetail } from "./item"
import { emptyStateStyle, fileListContainerStyle } from "./style"

export const UploadFileList: FC = () => {
  const { t } = useTranslation()

  const uploadFiles = useSyncExternalStore(
    updateFileDetailStore.subscribe,
    updateFileDetailStore.getSnapshot,
  )

  return (
    <div css={fileListContainerStyle}>
      {uploadFiles.length > 0 ? (
        <VirtualList
          height={PROCESS_DETAIL_LIST_HEIGHT}
          itemHeight={PROCESS_DETAIL_ITEM_HEIGHT}
          itemKey="queryID"
          data={uploadFiles}
        >
          {(item) => {
            return (
              <FileItemDetail
                {...item}
                onDelete={updateFileDetailStore.deleteFileDetailInfo}
                onRetry={updateFileDetailStore.retryUpload}
              />
            )
          }}
        </VirtualList>
      ) : (
        <div css={emptyStateStyle}>
          {t("drive.upload_modal.nothing_upload")}
        </div>
      )}
    </div>
  )
}
