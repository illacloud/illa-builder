import { FC } from "react"
import { useSelector } from "react-redux"
import { get } from "lodash"
import { Select } from "@illa-design/select"
import { BaseSelectSetterProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const EventTargetWidgetSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    attrName,
    widgetDisplayName,
    handleUpdateDsl,
    value,
  } = props

  const widgetDisplayNameMapProps = useSelector(getWidgetExecutionResult)

  const finalOptions = () => {
    const tmpOptions: { label: string; value: string }[] = []
    Object.keys(widgetDisplayNameMapProps).forEach((key) => {
      if (key !== widgetDisplayName) {
        const widgetType = widgetDisplayNameMapProps[key].$widgetType
        const widgetMethod =
          widgetBuilder(widgetType).eventHandlerConfig?.methods ?? []
        if (widgetMethod.length > 0) {
          tmpOptions.push({
            label: key,
            value: key,
          })
        }
      }
    })
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
