import { get, toPath } from "lodash"
import { FC, useCallback } from "react"
import { SelectedProvider } from "@/page/App/components//InspectPanel/context/selectedContext"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"
import { BaseEventHandlerProvider } from "@/page/App/components/PanelSetters/EventHandlerSetter/context"
import { NewBaseEventHandlerSetterProps } from "@/page/App/components/PanelSetters/EventHandlerSetter/interface"
import { generateNewEventItem } from "@/page/App/components/PanelSetters/EventHandlerSetter/utils"
import { AddActionLabel } from "@/page/App/components/PanelSetters/PublicComponent/Label/addActionLabel"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
import { ListBody } from "./List/body"

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
    widgetParentDisplayName,
    panelConfig,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
    widgetOrAction,
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
    handleUpdateDsl(attrName, [...oldEventItem, newEventItem])
  }, [eventHandlerConfig, value, handleUpdateDsl, attrName])

  const eventHandlerDSL = useCallback(
    (attrPath: string, value: unknown) => {
      let realAttrPath = attrPath
      if (widgetOrAction === "WIDGET" && realAttrPath.indexOf("events") !== 0) {
        realAttrPath = realAttrPath.slice(realAttrPath.indexOf("events"))
      }
      const realPath = toPath(realAttrPath)
      let basePath = realPath[0]
      if (widgetOrAction === "WIDGET" && attrPath.indexOf("events") !== 0) {
        basePath = convertPathToString(
          toPath(
            attrPath.slice(0, attrPath.indexOf("events") + "events".length),
          ),
        )
      }
      const index = realPath[1]
      const path = realPath[2]
      const events = get(panelConfig, basePath, [])
      const currentValue = get(events, index)
      let newEventItem = currentValue ?? {}
      switch (path) {
        case "eventType": {
          newEventItem = {
            eventType: value,
            id: currentValue.id,
          }
          break
        }
        case "actionType": {
          newEventItem = {
            eventType: currentValue.eventType,
            id: currentValue.id,
            actionType: value,
          }
          break
        }
        case "widgetID": {
          newEventItem = {
            id: currentValue.id,
            actionType: currentValue.actionType,
            eventType: currentValue.eventType,
            widgetID: value,
          }
          break
        }
        case "widgetMethod": {
          newEventItem = {
            id: currentValue.id,
            actionType: currentValue.actionType,
            eventType: currentValue.eventType,
            widgetID: currentValue.widgetID,
            widgetMethod: value,
          }
          break
        }
        default: {
          newEventItem = {
            ...currentValue,
            [path]: value,
          }
        }
      }

      const newEvents = events.map((item: Record<string, unknown>) => {
        if (item.id === newEventItem.id) {
          return newEventItem
        }
        return item
      })
      handleUpdateDsl(attrName, newEvents)
    },
    [attrName, handleUpdateDsl, panelConfig, widgetOrAction],
  )

  if (
    !childrenSetter ||
    !Array.isArray(childrenSetter) ||
    childrenSetter.length < 1
  )
    return null

  return (
    <SelectedProvider
      widgetType={widgetType}
      widgetDisplayName={widgetDisplayName}
      widgetParentDisplayName={widgetParentDisplayName}
      widgetProps={panelConfig}
      widgetOrAction={widgetOrAction}
      handleUpdateDsl={eventHandlerDSL}
      handleUpdateMultiAttrDSL={handleUpdateMultiAttrDSL!}
      handleUpdateOtherMultiAttrDSL={handleUpdateOtherMultiAttrDSL!}
    >
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
    </SelectedProvider>
  )
}

EventHandlerSetter.displayName = "EventHandlerSetter"
