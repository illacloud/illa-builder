import { FC, useCallback, useRef, useState } from "react"
import { DragItem, ListItemProps } from "./interface"
import { useDrag, useDrop, XYCoord } from "react-dnd"
import { Identifier } from "dnd-core"
import { Trigger } from "@illa-design/trigger"
import { Modal } from "./modal"
import {
  labelNameAndIconCss,
  labelNameWrapper,
  movableIconWrapperCss,
  optionListItemCss,
} from "./style"
import { MoreIcon } from "@illa-design/icon"
import useBus, { dispatch } from "use-bus"
import { ActionMenu } from "@/page/Editor/components/PanelSetters/OptionListSetter/ActionMenu"

export const ListItem: FC<ListItemProps> = (props) => {
  const {
    id,
    label,
    value,
    disabled,
    index,
    handleUpdateItem,
    moveItem,
    handleCopyItem,
    handleDeleteItem,
  } = props

  const [modalVisible, setModalVisible] = useState(false)
  const [actionMenuVisible, setActionMenuVisible] = useState(false)

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
          colorScheme="white"
          popupVisible={modalVisible}
          content={
            <Modal
              title="Edit Options"
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
            <span css={movableIconWrapperCss} className="movableIconWrapper">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.6667 11.6668C10.8508 11.6668 11 11.8161 11 12.0002V13.3335C11 13.5176 10.8508 13.6668 10.6667 13.6668H9.33333C9.14924 13.6668 9 13.5176 9 13.3335V12.0002C9 11.8161 9.14924 11.6668 9.33333 11.6668H10.6667ZM6.66667 11.6668C6.85076 11.6668 7 11.8161 7 12.0002V13.3335C7 13.5176 6.85076 13.6668 6.66667 13.6668H5.33333C5.14924 13.6668 5 13.5176 5 13.3335V12.0002C5 11.8161 5.14924 11.6668 5.33333 11.6668H6.66667ZM9.33333 7.00016H10.6667C10.8508 7.00016 11 7.1494 11 7.3335V8.66683C11 8.85092 10.8508 9.00016 10.6667 9.00016H9.33333C9.14924 9.00016 9 8.85092 9 8.66683V7.3335C9 7.1494 9.14924 7.00016 9.33333 7.00016ZM5.33333 7.00016H6.66667C6.85076 7.00016 7 7.1494 7 7.3335V8.66683C7 8.85092 6.85076 9.00016 6.66667 9.00016H5.33333C5.14924 9.00016 5 8.85092 5 8.66683V7.3335C5 7.1494 5.14924 7.00016 5.33333 7.00016ZM10.6667 2.3335C10.8508 2.3335 11 2.48273 11 2.66683V4.00016C11 4.18426 10.8508 4.3335 10.6667 4.3335H9.33333C9.14924 4.3335 9 4.18426 9 4.00016V2.66683C9 2.48273 9.14924 2.3335 9.33333 2.3335H10.6667ZM6.66667 2.3335C6.85076 2.3335 7 2.48273 7 2.66683V4.00016C7 4.18426 6.85076 4.3335 6.66667 4.3335H5.33333C5.14924 4.3335 5 4.18426 5 4.00016V2.66683C5 2.48273 5.14924 2.3335 5.33333 2.3335H6.66667Z"
                  fill="#959EA9"
                />
              </svg>
            </span>
            <span css={labelNameWrapper}>{label || value || "No label"}</span>
          </div>
        </Trigger>
        <Trigger
          colorScheme="white"
          popupVisible={actionMenuVisible}
          content={
            <ActionMenu
              index={index}
              handleCopyItem={handleCopyItem}
              handleDeleteItem={handleDeleteItem}
              handleCloseMode={handleCloseActionMenu}
            />
          }
          trigger="click"
          showArrow={false}
          position="bottom"
          clickOutsideToClose
          onVisibleChange={(visible) => {
            if (!visible) {
              setActionMenuVisible(false)
            }
          }}
        >
          <div ref={moreIconRef} onClick={handleOpenActionMenu}>
            <MoreIcon />
          </div>
        </Trigger>
      </div>
    </div>
  )
}
