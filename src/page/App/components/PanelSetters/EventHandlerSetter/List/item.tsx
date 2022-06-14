import { FC, useCallback, useEffect, useState } from "react"
import {
  listItemActionContentStyle,
  listItemStyle,
  listItemFuncContentStyle,
  listItemTitleWrapperStyle,
  moreIconStyle,
} from "./style"
import { MoreIcon } from "@illa-design/icon"
import { Trigger } from "@illa-design/trigger"
import { EventHandle } from "../Edit"
import useBus from "use-bus"
import {
  BaseEventItem,
  EventType,
} from "@/page/App/components/PanelSetters/EventHandlerSetter/interface"
import { ActionMenu } from "./ActionMenu"
import { ListItemProps } from "@/page/App/components/PanelSetters/EventHandlerSetter/List/interface"

const formatFuncContent = (event: BaseEventItem) => {
  const { method, type, targetId } = event
  if (type === "datasource" || type === "widget" || type === "state")
    return targetId ? `${targetId}.${method}()` : "Incomplete selection"
  if (type === "script") return "Run script"
  return `${method}()`
}

const typeMappedMethod: Record<EventType, { type: EventType; method: string }> =
  {
    datasource: {
      type: "datasource",
      method: "trigger",
    },
    script: {
      type: "script",
      method: "run",
    },
    state: {
      type: "state",
      method: "setState",
    },
    openUrl: {
      type: "openUrl",
      method: "openUrl",
    },
    showNotification: {
      type: "showNotification",
      method: "showNotification",
    },
    widget: {
      type: "widget",
      method: "",
    },
  }

export const ListItem: FC<ListItemProps> = (props) => {
  const {
    index,
    event,
    handleCopyItem,
    handleDeleteItem,
    childrenSetter,
    handleUpdateItem,
  } = props
  const [visible, setVisible] = useState<boolean>(false)
  const [actionMenuVisible, setActionMenuVisible] = useState(false)

  const handleOpenModal = useCallback(() => {
    setVisible(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setVisible(false)
  }, [])

  const handleCloseActionMenu = useCallback(() => {
    setActionMenuVisible(false)
  }, [])

  useBus(`CLOSE_EVENT_LIST_ALL_MODAL`, handleCloseModal, [handleCloseModal])
  useBus(`OPEN_EVENT_LIST_ITEM_MODAL_${index}`, handleOpenModal, [
    handleOpenModal,
    index,
  ])
  useBus(`CLOSE_EVENT_LIST_ITEM_MODAL_${index}`, handleCloseModal, [
    handleCloseModal,
    index,
  ])

  const calcTypeRealValue = useCallback<
    (type: EventType) => Partial<BaseEventItem>
  >((type: EventType) => {
    if (typeMappedMethod[type]) return typeMappedMethod[type]
    return {
      type,
      method: "",
    }
  }, [])

  const finalHandleUpdateItem = useCallback(
    (value: Record<string, any>) => {
      let finalValue = { ...event, ...value }
      if ("type" in value) {
        const res = calcTypeRealValue(value.type)
        finalValue = { ...finalValue, ...res }
      }
      handleUpdateItem(index, finalValue)
    },
    [index, calcTypeRealValue, handleUpdateItem],
  )

  return (
    <div css={listItemStyle}>
      <Trigger
        trigger="click"
        content={
          <EventHandle
            event={event}
            handleCloseModal={handleCloseModal}
            childrenSetter={childrenSetter}
            handleUpdateItem={finalHandleUpdateItem}
          />
        }
        showArrow={false}
        colorScheme="white"
        position="left"
        withoutPadding
        clickOutsideToClose
        popupVisible={visible}
        onVisibleChange={(visible) => {
          if (!visible) {
            handleCloseModal()
          }
        }}
      >
        <div css={listItemTitleWrapperStyle} onClick={handleOpenModal}>
          <span css={listItemActionContentStyle}>{event.event}</span>
          <span css={listItemFuncContentStyle}>{formatFuncContent(event)}</span>
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
        <div
          css={moreIconStyle}
          onClick={() => {
            setActionMenuVisible(true)
          }}
        >
          <MoreIcon />
        </div>
      </Trigger>
    </div>
  )
}
ListItem.displayName = "EventHandlerListItem"
