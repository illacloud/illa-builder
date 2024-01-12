import { get } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { BaseSelectSetterProps } from "./interface"
import SearchSelectSetter from "./searchSelect"

const EventActionTypeSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    attrName,
    parentAttrName,
    handleUpdateDsl,
    widgetDisplayName,
    widgetOrAction,
  } = props

  const widgetDisplayNameMapProps = useSelector(getWidgetExecutionResult)
  const selectedAction = useSelector(getCachedAction)

  const oldEvent = useMemo(() => {
    if (widgetOrAction === "WIDGET") {
      return get(
        widgetDisplayNameMapProps,
        `${widgetDisplayName}.${parentAttrName}`,
        {},
      )
    } else {
      return get(selectedAction, `content.${parentAttrName}`, {})
    }
  }, [
    widgetOrAction,
    widgetDisplayNameMapProps,
    widgetDisplayName,
    parentAttrName,
    selectedAction,
  ])

  const _finalAttrPath = parentAttrName ? parentAttrName : attrName
  const handleUpdateDSLInner = useCallback(
    (attrPath: string, value: unknown) => {
      handleUpdateDsl(attrPath, {
        actionType: value,
        id: oldEvent?.id,
        eventType: oldEvent?.eventType,
      })
    },
    [handleUpdateDsl, oldEvent?.eventType, oldEvent?.id],
  )

  return (
    <SearchSelectSetter
      {...props}
      attrName={_finalAttrPath}
      handleUpdateDsl={handleUpdateDSLInner}
    />
  )
}
EventActionTypeSelect.displayName = "EventActionTypeSelect"
export default EventActionTypeSelect
