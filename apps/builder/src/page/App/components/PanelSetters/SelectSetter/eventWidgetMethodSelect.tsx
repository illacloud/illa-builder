import { get } from "lodash"
import { FC, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { getCachedAction } from "@/redux/config/configSelector"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { BaseSelectSetterProps } from "./interface"

export const EventWidgetMethodSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    attrName,
    parentAttrName,
    handleUpdateDsl,
    value,
    widgetDisplayName,
    widgetOrAction,
  } = props

  const widgetDisplayNameMapProps = useSelector(getWidgetExecutionResult)
  const selectedAction = useSelector(getCachedAction)
  const selectedWidgetID = useMemo(() => {
    if (widgetOrAction === "WIDGET") {
      return get(
        widgetDisplayNameMapProps,
        `${widgetDisplayName}.${parentAttrName}.widgetID`,
      )
    } else {
      return get(selectedAction, `content.${parentAttrName}.widgetID`)
    }
  }, [
    widgetDisplayNameMapProps,
    widgetDisplayName,
    parentAttrName,
    selectedAction,
    widgetOrAction,
  ])
  const selectedWidgetType = useMemo(() => {
    return get(widgetDisplayNameMapProps, `${selectedWidgetID}.$widgetType`)
  }, [widgetDisplayNameMapProps, selectedWidgetID])
  const finalOptions = useMemo(() => {
    let tmpOptions: string[] = []
    const eventHandlerConfig =
      widgetBuilder(selectedWidgetType)?.eventHandlerConfig
    if (eventHandlerConfig) {
      tmpOptions = eventHandlerConfig.methods
    }
    return tmpOptions
  }, [selectedWidgetType])

  const finalValue = useMemo(() => {
    const index = finalOptions.findIndex((option) => {
      return option === value
    })
    if (index !== -1 && selectedWidgetType !== undefined) return value
    return undefined
  }, [finalOptions, value, selectedWidgetType])

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions}
        size="medium"
        value={finalValue}
        colorScheme="techPurple"
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}
EventWidgetMethodSelect.displayName = "EventWidgetMethodSelect"
