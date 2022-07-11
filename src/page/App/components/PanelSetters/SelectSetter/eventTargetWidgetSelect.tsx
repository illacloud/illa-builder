import { FC } from "react"
import { Select } from "@illa-design/select"
import { BaseSelectSetterProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { useSelector } from "react-redux"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"

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
        tmpOptions.push({
          label: key,
          value: key,
        })
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
