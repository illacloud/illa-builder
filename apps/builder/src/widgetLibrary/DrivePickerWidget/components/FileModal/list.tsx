import VirtualList from "rc-virtual-list"
import { FC, MouseEvent, useCallback, useRef } from "react"
import { Checkbox } from "@illa-design/react"
import { GCS_OBJECT_TYPE, IILLAFileInfo } from "@/services/drive"
import { getFileIconByContentType } from "@/widgetLibrary/DrivePickerWidget/utils"
import {
  FOLDER_LIST_CONTAINER_HEIGHT,
  FOLDER_LIST_ITEM_HEIGHT,
} from "./constants"
import { FileListProps } from "./interface"
import { fileNameStyle, iconPublicStyle, listItemContainerStyle } from "./style"

export const FileList: FC<FileListProps> = (props) => {
  const {
    listData,
    totalPath,
    search,
    selectItems,
    colorScheme,
    onChange,
    getFileList,
    updatePath,
  } = props

  const handleClickItem = useCallback(
    (e: MouseEvent<HTMLLabelElement>, item: IILLAFileInfo) => {
      e.stopPropagation()
      if (
        item.type === GCS_OBJECT_TYPE.FOLDER ||
        item.type === GCS_OBJECT_TYPE.ANONYMOUS_FOLDER
      ) {
        updatePath(`${totalPath}/${item.name}`)
      }
    },
    [totalPath, updatePath],
  )

  const currentPageIndexRef = useRef(1)

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      FOLDER_LIST_CONTAINER_HEIGHT
    ) {
      getFileList(++currentPageIndexRef.current, totalPath, search?.current)
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
          <label
            css={listItemContainerStyle}
            onClick={(e) => handleClickItem(e, item)}
          >
            <Checkbox
              colorScheme={colorScheme}
              disabled={
                item.type === GCS_OBJECT_TYPE.FOLDER ||
                item.type === GCS_OBJECT_TYPE.ANONYMOUS_FOLDER
              }
              key={item.id}
              onChange={(v) => onChange(v, item)}
              defaultChecked={
                selectItems.findIndex((file) => file.id === item.id) !== -1
              }
            />
            {getFileIconByContentType(
              item.type,
              item.contentType,
              iconPublicStyle,
            )}
            <span css={fileNameStyle}>{item.name}</span>
          </label>
        )
      }}
    </VirtualList>
  )
}
