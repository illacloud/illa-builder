import { FC } from "react"
import { Select } from "@illa-design/select"
import { get } from "lodash"
import { BaseSelectSetterProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { useSelector } from "react-redux"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const EventWidgetMethodSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    attrName,
    parentAttrName,
    handleUpdateDsl,
    value,
    widgetDisplayName,
  } = props

  const widgetDisplayNameMapProps = useSelector(getWidgetExecutionResult)

  const finalOptions = () => {
    let tmpOptions: string[] = []
    const selectedWidgetID = get(
      widgetDisplayNameMapProps,
      `${widgetDisplayName}.${parentAttrName}.widgetID`,
    )
    const selectedWidgetType = get(
      widgetDisplayNameMapProps,
      `${selectedWidgetID}.$widgetType`,
    )
    const eventHandlerConfig =
      widgetBuilder(selectedWidgetType)?.eventHandlerConfig
    if (eventHandlerConfig) {
      tmpOptions = eventHandlerConfig.methods
    }
    return tmpOptions
  }

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions()}
        size="small"
        value={value}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}
EventWidgetMethodSelect.displayName = "EventWidgetMethodSelect"
