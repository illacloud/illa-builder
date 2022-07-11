import { FC, useCallback, useMemo } from "react"
import { EventHandlerSetterHeader } from "./List/header"
import { ListBody } from "./List/body"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { generateNewEventItem } from "@/page/App/components/PanelSetters/EventHandlerSetter/utils"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { NewBaseEventHandlerSetterProps } from "@/page/App/components/PanelSetters/EventHandlerSetter/interface"
import { BaseEventHandlerProvider } from "@/page/App/components/PanelSetters/EventHandlerSetter/context"

export const EventHandlerSetter: FC<NewBaseEventHandlerSetterProps> = (
  props,
) => {
  const {
    value,
    childrenSetter,
    handleUpdateDsl,
    widgetType,
    attrName,
    widgetDisplayName,
    labelName,
    labelDesc,
  } = props

  const eventHandlerConfig = useMemo(
    () =>
      widgetBuilder(widgetType).eventHandlerConfig ?? {
        events: [],
        method: [],
      },
    [widgetType],
  )
  const handleAddItemAsync = useCallback(async () => {
    const { events: defaultEvents } = eventHandlerConfig
    const newEventItem = generateNewEventItem(defaultEvents[0], "query1")
    handleUpdateDsl("events", [newEventItem])
  }, [handleUpdateDsl, eventHandlerConfig])
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
        <EventHandlerSetterHeader
          labelName={labelName}
          labelDesc={labelDesc}
          handleAddItemAsync={handleAddItemAsync}
        />
        <ListBody events={value} />
      </div>
    </BaseEventHandlerProvider>
  )
}

EventHandlerSetter.displayName = "NewBaseEventHandlerSetter"
