import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { getCachedAction } from "@/redux/config/configSelector"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { BaseSelectSetter } from "./baseSelect"
import { BaseSelectSetterProps } from "./interface"

export const EventActionTypeSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    attrName,
    parentAttrName,
    handleUpdateDsl,
    value,
    widgetDisplayName,
    options,
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
    <BaseSelectSetter
      {...props}
      attrName={_finalAttrPath}
      handleUpdateDsl={handleUpdateDSLInner}
    />
  )
}
EventActionTypeSelect.displayName = "EventActionTypeSelect"
