import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { Select } from "@illa-design/select"
import { EventTargetWidgetSelectProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"

export const EventTargetWidgetSelect: FC<EventTargetWidgetSelectProps> = (
  props,
) => {
  const {
    isSetterSingleRow,
    attrName,
    widgetDisplayName,
    handleUpdateDsl,
    value,
    widgetOrAction,
    methods,
  } = props

  const widgetDisplayNameMapProps = useSelector(getWidgetExecutionResult)

  const finalOptions = useMemo(() => {
    const tmpOptions: { label: string; value: string }[] = []
    Object.keys(widgetDisplayNameMapProps).forEach((key) => {
      if (key !== widgetDisplayName) {
        const widgetMethod = methods ?? []
        if (widgetMethod.length > 0) {
          tmpOptions.push({
            label: key,
            value: key,
          })
        }
      }
    })
    return tmpOptions
  }, [methods, widgetDisplayName, widgetDisplayNameMapProps])

  const actionFinalValue = useMemo(() => {
    const index = finalOptions.findIndex((option) => {
      return option.value === value
    })
    if (index !== -1) return value
    return undefined
  }, [finalOptions, value])

  const widgetFinalValue = useMemo(() => {
    const index = finalOptions.findIndex((option) => {
      return option.value === value
    })
    if (index !== -1) return value
    return undefined
  }, [finalOptions, value])

  const finalValue =
    widgetOrAction === "WIDGET" ? widgetFinalValue : actionFinalValue

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions}
        size="medium"
        colorScheme="techPurple"
        value={finalValue}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}
