import { get } from "lodash"
import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Trigger } from "@illa-design/react"
import i18n from "@/i18n/config"
import { BaseEventHandlerContext } from "@/page/App/components/PanelSetters/EventHandlerSetter/context"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { EventAndMethodLabelProps } from "./interface"
import {
  eventAndMethodWrapperStyle,
  eventNameStyle,
  methodNameStyle,
} from "./style"

const getMethodName = (
  actionType: string,
  widgetId: string,
  widgetMethod: string,
  queryID: string,
) => {
  if (actionType === "widget") {
    return widgetId && widgetMethod
      ? `${widgetId}.${widgetMethod}()`
      : i18n.t(
          "editor.inspect.setter_content.event_handler_list.incomplete_selection",
        )
  }
  if (actionType === "datasource") {
    return queryID
      ? `${queryID}.run()`
      : i18n.t(
          "editor.inspect.setter_content.event_handler_list.incomplete_selection",
        )
  }
  if (actionType) {
    return `${actionType}()`
  }
  return i18n.t(
    "editor.inspect.setter_content.event_handler_list.incomplete_selection",
  )
}

export const EventAndMethodLabel: FC<EventAndMethodLabelProps> = (props) => {
  const { index } = props
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false)
  const { widgetDisplayName, attrPath, childrenSetter, eventItems } =
    useContext(BaseEventHandlerContext)

  const event = get(eventItems, index)
  const { eventType, widgetID, queryID, widgetMethod, actionType } = event
  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])
  // @ts-ignore
  return (
    <Trigger
      withoutPadding
      colorScheme="white"
      popupVisible={modalVisible}
      content={
        <BaseModal
          title={t("editor.inspect.setter_content.event_handler_list.title")}
          handleCloseModal={handleCloseModal}
          attrPath={`${attrPath}.${index}`}
          widgetDisplayName={widgetDisplayName}
          childrenSetter={childrenSetter}
        />
      }
      trigger="click"
      showArrow={false}
      position="left-start"
      clickOutsideToClose
      onVisibleChange={(visible) => {
        setModalVisible(visible)
      }}
    >
      <div css={eventAndMethodWrapperStyle}>
        <div css={eventNameStyle}>
          {eventType
            ? (t(
                // @ts-ignore
                `editor.inspect.setter_content.widget_action_type_name.${eventType}`,
              ) as string)
            : t(
                "editor.inspect.setter_content.event_handler_list.incomplete_selection",
              )}
        </div>
        <div css={methodNameStyle}>
          {getMethodName(actionType, widgetID, widgetMethod, queryID)}
        </div>
      </div>
    </Trigger>
  )
}

EventAndMethodLabel.displayName = "EventAndMethodLabel"
