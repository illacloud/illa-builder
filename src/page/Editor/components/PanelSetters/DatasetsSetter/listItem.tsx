import { FC, useCallback, useRef, useState } from "react"
import { DragItem, ListItemProps } from "./interface"
import { useDrag, useDrop, XYCoord } from "react-dnd"
import { Identifier } from "dnd-core"
import { Trigger } from "@illa-design/trigger"
import { Modal } from "./modal"
import {
  aggregationMethodStyle,
  applyColorIndentStyle,
  labelNameAndIconCss,
  labelNameWrapper,
  movableIconWrapperCss,
  optionListItemCss,
} from "./style"
import { EyeOffIcon, EyeOnIcon, MoreIcon } from "@illa-design/icon"
import useBus, { dispatch } from "use-bus"
import { ActionMenu } from "@/page/Editor/components/PanelSetters/OptionListSetter/ActionMenu"
import { ModalV2 } from "@/page/Editor/components/PanelSetters/DatasetsSetter/modalV2"

export const ListItem: FC<ListItemProps> = (props) => {
  const {
    id,
    label,
    value,
    disabled,
    index,
    handleUpdateItem,
    moveItem,
    color = "",
    aggregationMethod,
    hidden,
    handleCopyItem,
    handleDeleteItem,
  } = props

  const [modalVisible, setModalVisible] = useState(false)
  const [actionMenuVisible, setActionMenuVisible] = useState(false)
  console.log("ListItem", props)

  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const moreIconRef = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: "OPTION_ITEM",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
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
      moveItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "OPTION_ITEM",
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleClickItemBody = useCallback(() => {
    dispatch("CLOSE_LIST_ALL_MODAL")
    setModalVisible(true)
  }, [])

  const handleOpenActionMenu = useCallback(() => {
    setActionMenuVisible(true)
  }, [])

  const handleCloseActionMenu = useCallback(() => {
    setActionMenuVisible(false)
  }, [])

  useBus(`CLOSE_LIST_ALL_MODAL`, handleCloseModal, [handleCloseModal])
  useBus(`OPEN_LIST_ITEM_MODAL_${index}`, handleOpenModal, [
    handleOpenModal,
    index,
  ])
  useBus(`CLOSE_LIST_ITEM_MODAL_${index}`, handleCloseModal, [
    handleCloseModal,
    index,
  ])

  drag(drop(ref))
  const opacity = isDragging ? 0 : 1

  return (
    <div ref={ref} style={{ opacity }}>
      <div css={optionListItemCss}>
        <Trigger
          withoutPadding
          colorScheme="white"
          popupVisible={modalVisible}
          content={
            <ModalV2
              name={label}
              title={label}
              label={label}
              value={value}
              index={index}
              disabled={disabled}
              handleUpdateItem={handleUpdateItem}
              handleCloseModal={handleCloseModal}
            />
          }
          trigger="click"
          showArrow={false}
          position="left"
          clickOutsideToClose
          onVisibleChange={(visible) => {
            if (!visible) {
              setModalVisible(false)
            }
          }}
        >
          <div
            css={labelNameAndIconCss}
            ref={triggerRef}
            onClick={handleClickItemBody}
          >
            <div css={labelNameAndIconCss}>
              <span css={applyColorIndentStyle(color)} />
              <span css={labelNameWrapper}>{label || value || "No label"}</span>
              <span css={aggregationMethodStyle}>{aggregationMethod}</span>
            </div>

            {hidden || label === "y2" ? <EyeOffIcon /> : <EyeOnIcon />}
          </div>
        </Trigger>
      </div>
    </div>
  )
}
