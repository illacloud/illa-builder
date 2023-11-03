import VirtualList from "rc-virtual-list"
import { FC, useCallback, useContext, useRef } from "react"
import { ReactComponent as AnonymousFolderIcon } from "@/assets/drive/anonymous.svg"
import { ReactComponent as FolderIcon } from "@/assets/drive/folder.svg"
import {
  FOLDER_LIST_CONTAINER_HEIGHT,
  FOLDER_LIST_ITEM_HEIGHT,
} from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/components/UploadFileModal/constants"
import { FileUploadContext } from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/provider/FileUploadProvider"
import { GCS_OBJECT_TYPE, IILLAFileInfo } from "@/services/drive"
import { FolderListProps } from "./interface"
import {
  folderIconStyle,
  folderNameStyle,
  listItemContainerStyle,
} from "./style"

const FolderList: FC<FolderListProps> = (props) => {
  const { listData, updateListData } = props
  const { currentFolderPath, setCurrentFolderPath } =
    useContext(FileUploadContext)

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
              <AnonymousFolderIcon css={folderIconStyle} />
            ) : (
              <FolderIcon css={folderIconStyle} />
            )}
            <span css={folderNameStyle}>{item.name}</span>
          </div>
        )
      }}
    </VirtualList>
  )
}

export default FolderList
