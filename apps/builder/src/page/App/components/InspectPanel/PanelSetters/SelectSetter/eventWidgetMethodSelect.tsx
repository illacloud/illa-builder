import { get } from "lodash-es"
import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { BaseSelectSetterProps } from "./interface"
import SearchSelectSetter from "./searchSelect"

const EventWidgetMethodSelect: FC<BaseSelectSetterProps> = (props) => {
  const { parentAttrName, value, widgetDisplayName, widgetOrAction } = props

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
    <SearchSelectSetter
      {...props}
      value={finalValue as string}
      options={finalOptions}
    />
  )
}
EventWidgetMethodSelect.displayName = "EventWidgetMethodSelect"
export default EventWidgetMethodSelect
