import { FC, useCallback, useContext, useRef, useState } from "react"
import {
  actionWrapperStyle,
  copyIconStyle,
  iconStyle,
  listItemTriggerWrapperStyle,
} from "./style"
import { ViewItemShape } from "./interface"
import { CopyIcon, ReduceIcon } from "@illa-design/icon"
import { DragIconAndLabel } from "./dragIconAndLabel"
import { ViewListSetterContext } from "./context/viewsListContext"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { Trigger } from "@illa-design/trigger"
import { useTranslation } from "react-i18next"
import { useDrag, useDrop, XYCoord } from "react-dnd"
import { DragItem } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import { Identifier } from "dnd-core"

interface ListItemProps {
  value: ViewItemShape
  index: number
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { value, index } = props
  const [modalVisible, setModalVisible] = useState(false)
  const {
    handleDeleteOptionItem,
    handleCopyOptionItem,
    attrPath,
    widgetDisplayName,
    childrenSetter,
    handleMoveOptionItem,
  } = useContext(ViewListSetterContext)
  const { t } = useTranslation()

  const dragRef = useRef<HTMLSpanElement>(null)

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: "VIEW_ITEM",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!dragRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = dragRef.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      handleMoveOptionItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "VIEW_ITEM",
    item: () => {
      return { index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(dragRef))
  const opacity = isDragging ? 0 : 1

  return (
    <Trigger
      withoutPadding
      colorScheme="white"
      popupVisible={modalVisible}
      content={
        <BaseModal
          title={t("editor.inspect.setter_content.option_list.model_title")}
          handleCloseModal={handleCloseModal}
          attrPath={`${attrPath}.${index}`}
          widgetDisplayName={widgetDisplayName}
          childrenSetter={childrenSetter}
        />
      }
      trigger="click"
      showArrow={false}
      position="left"
      clickOutsideToClose
      onVisibleChange={(visible) => {
        setModalVisible(visible)
      }}
    >
      <span css={listItemTriggerWrapperStyle} style={{ opacity }} ref={dragRef}>
        <DragIconAndLabel index={index} />
        <span css={actionWrapperStyle}>
          <CopyIcon
            css={copyIconStyle}
            id="copyIcon"
            onClick={(e) => {
              e.stopPropagation()
              handleCopyOptionItem(index)
            }}
          />
          <ReduceIcon
            css={iconStyle}
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteOptionItem(index)
            }}
          />
        </span>
      </span>
    </Trigger>
  )
}
