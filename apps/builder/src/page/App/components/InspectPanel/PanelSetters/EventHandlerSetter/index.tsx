import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback } from "react"
import { BaseEventHandlerProvider } from "@/page/App/components/InspectPanel/PanelSetters/EventHandlerSetter/context"
import { NewBaseEventHandlerSetterProps } from "@/page/App/components/InspectPanel/PanelSetters/EventHandlerSetter/interface"
import { generateNewEventItem } from "@/page/App/components/InspectPanel/PanelSetters/EventHandlerSetter/utils"
import { AddActionLabel } from "@/page/App/components/InspectPanel/PanelSetters/PublicComponent/Label/addActionLabel"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ListBody } from "./List/body"
import { containerStyle } from "./style"

const EventHandlerSetter: FC<NewBaseEventHandlerSetterProps> = (props) => {
  const {
    widgetType,
    value,
    childrenSetter,
    handleUpdateDsl,
    attrName,
    widgetDisplayName,
    labelName,
    labelDesc,
    defaultValue,
    eventHandlerConfig = {
      events: [`${defaultValue}`],
      method: [],
    },
  } = props

  const handleAddItemAsync = useCallback(async () => {
    const { events: defaultEvents } = eventHandlerConfig
    let oldEventItem = Array.isArray(value) ? value : []
    const eventType =
      typeof defaultEvents[0] === "string"
        ? defaultEvents[0]
        : defaultEvents[0].value
    const newEventItem = generateNewEventItem(eventType, "query1")
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "add_event_handler",
      parameter1: widgetType,
    })

    handleUpdateDsl(attrName, [...oldEventItem, newEventItem])
  }, [eventHandlerConfig, value, widgetType, handleUpdateDsl, attrName])

  if (
    !childrenSetter ||
    !Array.isArray(childrenSetter) ||
    childrenSetter.length < 1
  )
    return null

  return (
    <BaseEventHandlerProvider
      eventItems={value}
      attrPath={attrName}
      handleUpdateDsl={handleUpdateDsl}
      widgetDisplayName={widgetDisplayName}
      childrenSetter={childrenSetter}
      widgetType={widgetType}
    >
      <div css={containerStyle}>
        <AddActionLabel
          labelName={labelName}
          labelDesc={labelDesc}
          handleAddItem={handleAddItemAsync}
        />
        <ListBody events={value} />
      </div>
    </BaseEventHandlerProvider>
  )
}

EventHandlerSetter.displayName = "EventHandlerSetter"
export default EventHandlerSetter
