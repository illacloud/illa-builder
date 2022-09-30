import { FC, useEffect, useMemo } from "react"
import { Select } from "@illa-design/select"
import { get } from "lodash"
import { BaseSelectSetterProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { useSelector } from "react-redux"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { getSelectedAction } from "@/redux/config/configSelector"

export const EventWidgetMethodSelect: FC<BaseSelectSetterProps> = props => {
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
  const selectedAction = useSelector(getSelectedAction)
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
    const eventHandlerConfig = widgetBuilder(selectedWidgetType)
      ?.eventHandlerConfig
    if (eventHandlerConfig) {
      tmpOptions = eventHandlerConfig.methods
    }
    return tmpOptions
  }, [selectedWidgetType])

  const finalValue = useMemo(() => {
    const index = finalOptions.findIndex(option => {
      return option === value
    })
    if (index !== -1 && selectedWidgetType !== undefined) return value
    return undefined
  }, [finalOptions, value, selectedWidgetType])

  useEffect(() => {
    if (finalValue === undefined) {
      handleUpdateDsl(attrName, undefined)
    }
  }, [attrName, finalValue, handleUpdateDsl])

  return (
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions}
        size="medium"
        value={finalValue}
        onChange={value => {
          handleUpdateDsl(attrName, value)
        }}
      />
    </div>
  )
}
EventWidgetMethodSelect.displayName = "EventWidgetMethodSelect"
