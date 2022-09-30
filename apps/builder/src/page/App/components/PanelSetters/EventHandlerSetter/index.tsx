import { FC, useCallback, useMemo } from "react"
import { ListBody } from "./List/body"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { generateNewEventItem } from "@/page/App/components/PanelSetters/EventHandlerSetter/utils"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { NewBaseEventHandlerSetterProps } from "@/page/App/components/PanelSetters/EventHandlerSetter/interface"
import { BaseEventHandlerProvider } from "@/page/App/components/PanelSetters/EventHandlerSetter/context"
import { AddActionLabel } from "@/page/App/components/PanelSetters/PublicComponent/Label/addActionLabel"

export const EventHandlerSetter: FC<NewBaseEventHandlerSetterProps> = props => {
  const {
    value,
    childrenSetter,
    handleUpdateDsl,
    widgetType,
    attrName,
    widgetDisplayName,
    labelName,
    labelDesc,
    defaultValue,
  } = props

  const eventHandlerConfig = useMemo(
    () =>
      widgetBuilder(widgetType)?.eventHandlerConfig ?? {
        events: [`${defaultValue}`],
        method: [],
      },
    [widgetType, defaultValue],
  )
  const handleAddItemAsync = useCallback(async () => {
    const { events: defaultEvents } = eventHandlerConfig
    let oldEventItem = Array.isArray(value) ? value : []
    const eventType =
      typeof defaultEvents[0] === "string"
        ? defaultEvents[0]
        : defaultEvents[0].value
    const newEventItem = generateNewEventItem(eventType, "query1")
    handleUpdateDsl(attrName, [...oldEventItem, newEventItem])
  }, [eventHandlerConfig, value, handleUpdateDsl, attrName])

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
    >
      <div css={publicPaddingStyle}>
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
