import { getFileIconByContentType } from "@illa-public/icon"
import { GCS_OBJECT_TYPE, IILLAFileInfo } from "@illa-public/public-types"
import VirtualList from "rc-virtual-list"
import { FC, MouseEvent, useCallback, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Checkbox, DoubtIcon, Trigger } from "@illa-design/react"
import {
  FOLDER_LIST_CONTAINER_HEIGHT,
  FOLDER_LIST_ITEM_HEIGHT,
} from "@/components/DriveFileSelect/constants"
import { FileListProps } from "./interface"
import {
  doubtStyle,
  fileNameStyle,
  iconPublicStyle,
  listItemContainerStyle,
  singleListItemContainerStyle,
} from "./style"

const FileList: FC<FileListProps> = (props) => {
  const {
    listData,
    totalPath,
    search,
    selectItems,
    colorScheme,
    singleSelect,
    onChange,
    getFileList,
    updatePath,
    handleSingleChange,
  } = props

  const { t } = useTranslation()

  const handleClickItem = useCallback(
    (e: MouseEvent<HTMLLabelElement>, item: IILLAFileInfo) => {
      e.stopPropagation()
      if (
        item.type === GCS_OBJECT_TYPE.FOLDER ||
        item.type === GCS_OBJECT_TYPE.ANONYMOUS_FOLDER
      ) {
        updatePath(`${totalPath}/${item.name}`)
        return
      } else if (singleSelect) {
        handleSingleChange(item)
      }
    },
    [singleSelect, totalPath, updatePath, handleSingleChange],
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
            css={
              singleSelect
                ? singleListItemContainerStyle(selectItems[0]?.id === item.id)
                : listItemContainerStyle
            }
            onClick={(e) => handleClickItem(e, item)}
          >
            {!singleSelect && (
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
            )}
            {getFileIconByContentType(
              item.type,
              item.contentType,
              iconPublicStyle,
            )}
            <span css={fileNameStyle}>{item.name}</span>
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
          </label>
        )
      }}
    </VirtualList>
  )
}

export default FileList
