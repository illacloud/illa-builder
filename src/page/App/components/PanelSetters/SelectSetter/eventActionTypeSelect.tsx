import { FC, useMemo } from "react"
import { Select } from "@illa-design/select"
import { get } from "lodash"
import { BaseSelectSetterProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { useSelector } from "react-redux"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"

export const EventActionTypeSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    attrName,
    parentAttrName,
    handleUpdateDsl,
    value,
    widgetDisplayName,
    options,
  } = props

  const widgetDisplayNameMapProps = useSelector(getWidgetExecutionResult)

  const oldEvent = useMemo(() => {
    const event = get(
      widgetDisplayNameMapProps,
      `${widgetDisplayName}.${parentAttrName}`,
    )
    return event ?? {}
  }, [widgetDisplayNameMapProps, parentAttrName])

  const _finalAttrPath = parentAttrName ? parentAttrName : attrName

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={options}
        size="small"
        value={value}
        onChange={(value) => {
          handleUpdateDsl(_finalAttrPath, {
            actionType: value,
            id: oldEvent?.id,
            eventType: oldEvent?.eventType,
          })
        }}
      />
    </div>
  )
}
EventActionTypeSelect.displayName = "EventActionTypeSelect"
