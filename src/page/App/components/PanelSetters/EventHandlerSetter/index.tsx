import { FC, useCallback } from "react"
import { eventHandlerSetterWrapperStyle } from "./style"
import { List } from "./List"
import { EventHandlerSetterHeader } from "@/page/App/components/PanelSetters/EventHandlerSetter/header"
import {
  BaseEventItem,
  EventHandlerSetterProps,
} from "@/page/App/components/PanelSetters/EventHandlerSetter/interface"
import { useSelector } from "react-redux"
import { transformEvent } from "./utils"
import { getComponentNodeBySingleSelected } from "@/redux/currentApp/editor/components/componentsSelector"

export const EventHandlerSetter: FC<EventHandlerSetterProps> = (props) => {
  const {
    labelName,
    labelDesc,
    panelConfig,
    attrName,
    handleUpdateDsl,
    childrenSetter,
  } = props
  const events = panelConfig[attrName] || []
  const widgetProps = useSelector(getComponentNodeBySingleSelected)?.props
  const dslEvents = widgetProps?.events || []

  const handleAddItemAsync = useCallback(
    async (value: BaseEventItem) => {
      const newOptions = [...events]
      const newDslEvents = [...dslEvents]
      newOptions.push(value)
      const script = transformEvent(value)
      newDslEvents.push(script)
      handleUpdateDsl(events, newDslEvents)
    },
    [handleUpdateDsl],
  )

  const handleUpdate = useCallback(
    (value: BaseEventItem[], dslValue?: Record<string, any>) => {
      handleUpdateDsl(events, dslValue)
    },
    [handleUpdateDsl],
  )

  return (
    <div css={eventHandlerSetterWrapperStyle}>
      <EventHandlerSetterHeader
        labelName={labelName}
        labelDesc={labelDesc}
        handleAddItemAsync={handleAddItemAsync}
        events={events}
      />
      <List
        dslEvents={dslEvents}
        events={events}
        handleUpdate={handleUpdate}
        childrenSetter={childrenSetter}
      />
    </div>
  )
}

EventHandlerSetter.displayName = "EventHandlerSetter"
