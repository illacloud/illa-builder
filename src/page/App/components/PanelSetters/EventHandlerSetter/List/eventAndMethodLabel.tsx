import { FC, useCallback, useContext, useState } from "react"
import { Trigger } from "@illa-design/trigger"
import { get } from "lodash"
import {
  eventAndMethodWrapperStyle,
  eventNameStyle,
  methodNameStyle,
} from "./style"
import { EventAndMethodLabelProps } from "./interface"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { BaseEventHandlerContext } from "@/page/App/components/PanelSetters/NewBaseEventHandlerSetter/context"

const getMethodName = (
  actionType: string,
  widgetId: string,
  widgetMethod: string,
  queryID: string,
) => {
  if (actionType === "widget") {
    return widgetId && widgetMethod
      ? `${widgetId}.${widgetMethod}()`
      : `No Method`
  }
  if (actionType === "query") {
    return queryID ? `${queryID}.trigger()` : "No Method"
  }
}

export const EventAndMethodLabel: FC<EventAndMethodLabelProps> = (props) => {
  const { index } = props
  const [modalVisible, setModalVisible] = useState(false)
  const { widgetDisplayName, attrPath, childrenSetter, eventItems } =
    useContext(BaseEventHandlerContext)

  const event = get(eventItems, index)
  const { eventType, widgetID, queryID, widgetMethod, actionType } = event
  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])
  return (
    <Trigger
      colorScheme="white"
      popupVisible={modalVisible}
      content={
        <BaseModal
          title="Edit Options"
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
      <div css={eventAndMethodWrapperStyle}>
        <div css={eventNameStyle}>{eventType}</div>
        <div css={methodNameStyle}>
          {getMethodName(actionType, widgetID, widgetMethod, queryID)}
        </div>
      </div>
    </Trigger>
  )
}

EventAndMethodLabel.displayName = "DragIconAndLabel"
