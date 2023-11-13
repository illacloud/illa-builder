import { AnonymousIcon, FolderIcon } from "@illa-public/icon"
import { GCS_OBJECT_TYPE, IILLAFileInfo } from "@illa-public/public-types"
import VirtualList from "rc-virtual-list"
import { FC, useCallback, useContext, useRef } from "react"
import { useTranslation } from "react-i18next"
import { DoubtIcon, Trigger } from "@illa-design/react"
import {
  FOLDER_LIST_CONTAINER_HEIGHT,
  FOLDER_LIST_ITEM_HEIGHT,
} from "../../constants"
import { FolderOperateModalContext } from "../../context"
import { FolderListProps } from "./interface"
import {
  doubtStyle,
  folderIconStyle,
  folderNameStyle,
  listItemContainerStyle,
} from "./style"

const FolderList: FC<FolderListProps> = (props) => {
  const { listData, updateListData } = props
  const { t } = useTranslation()
  const { currentFolderPath, setCurrentFolderPath } = useContext(
    FolderOperateModalContext,
  )

  const handleClickItem = useCallback(
    (name: string) => {
      return () => {
        const path = `${currentFolderPath}/${name}`
        setCurrentFolderPath(path)
      }
    },
    [currentFolderPath, setCurrentFolderPath],
  )
  const currentPageIndexRef = useRef(1)

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      FOLDER_LIST_CONTAINER_HEIGHT
    ) {
      updateListData(++currentPageIndexRef.current, currentFolderPath)
    }
  }

  return (
    <VirtualList
      height={FOLDER_LIST_CONTAINER_HEIGHT}
      itemHeight={FOLDER_LIST_ITEM_HEIGHT}
      itemKey="id"
      data={listData}
      onScroll={onScroll}
    >
      {(item: IILLAFileInfo) => {
        return (
          <div
            css={listItemContainerStyle}
            onClick={handleClickItem(item.name)}
          >
            {item.type === GCS_OBJECT_TYPE.ANONYMOUS_FOLDER ? (
              <AnonymousIcon css={folderIconStyle} />
            ) : (
              <FolderIcon css={folderIconStyle} />
            )}
            <span css={folderNameStyle}>{item.name}</span>
            {item.type === GCS_OBJECT_TYPE.ANONYMOUS_FOLDER && (
              <Trigger
                position="top"
                content={t("drive.drive_builder.public_folder.tips")}
              >
                <span css={doubtStyle}>
                  <DoubtIcon size="16px" />
                </span>
              </Trigger>
            )}
          </div>
        )
      }}
    </VirtualList>
  )
}

export default FolderList
