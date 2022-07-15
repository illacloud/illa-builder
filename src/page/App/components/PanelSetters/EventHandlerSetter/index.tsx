import { FC, useCallback, useMemo } from "react"
import { EventHandlerSetterHeader } from "./List/header"
import { ListBody } from "./List/body"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { generateNewEventItem } from "@/page/App/components/PanelSetters/EventHandlerSetter/utils"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { NewBaseEventHandlerSetterProps } from "@/page/App/components/PanelSetters/EventHandlerSetter/interface"
import { BaseEventHandlerProvider } from "@/page/App/components/PanelSetters/EventHandlerSetter/context"
import { useTranslation } from "react-i18next"

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
    defaultValue,
  } = props

  const { t } = useTranslation()

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
    const newEventItem = generateNewEventItem(defaultEvents[0], "query1")
    handleUpdateDsl(attrName, [...oldEventItem, newEventItem])
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
          labelName={t(labelName)}
          labelDesc={labelDesc}
          handleAddItemAsync={handleAddItemAsync}
        />
        <ListBody events={value} />
      </div>
    </BaseEventHandlerProvider>
  )
}

EventHandlerSetter.displayName = "EventHandlerSetter"
