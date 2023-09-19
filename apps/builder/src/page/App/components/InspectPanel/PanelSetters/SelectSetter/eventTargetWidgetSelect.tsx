import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import {
  getCurrentPageWidgetExecutionResultArray,
  getWidgetExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { BaseSelectSetterProps } from "./interface"
import SearchSelectSetter from "./searchSelect"

const EventTargetWidgetSelect: FC<BaseSelectSetterProps> = (props) => {
  const { widgetDisplayName, value, widgetOrAction } = props

  const widgetDisplayNameMapProps = useSelector(getWidgetExecutionResult)
  const currentPageWidgetDisplayNameMapProps = useSelector(
    getCurrentPageWidgetExecutionResultArray,
  )

  const finalOptions = useMemo(() => {
    const tmpOptions: { label: string; value: string }[] = []
    if (widgetOrAction === "ACTION") {
      Object.keys(widgetDisplayNameMapProps).forEach((key) => {
        if (key !== widgetDisplayName) {
          const widgetType = widgetDisplayNameMapProps[key].$widgetType
          const widgetMethod =
            widgetBuilder(widgetType)?.eventHandlerConfig?.methods ?? []
          if (widgetMethod.length > 0) {
            tmpOptions.push({
              label: key,
              value: key,
            })
          }
        }
      })
    }

    if (widgetOrAction === "WIDGET") {
      currentPageWidgetDisplayNameMapProps.forEach((node) => {
        const key = node.displayName
        if (key !== widgetDisplayName) {
          const widgetType = node.$widgetType
          const widgetMethod =
            widgetBuilder(widgetType)?.eventHandlerConfig?.methods ?? []
          if (widgetMethod.length > 0) {
            tmpOptions.push({
              label: key,
              value: key,
            })
          }
        }
      })
    }

    return tmpOptions
  }, [
    currentPageWidgetDisplayNameMapProps,
    widgetDisplayName,
    widgetDisplayNameMapProps,
    widgetOrAction,
  ])

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
    <SearchSelectSetter
      {...props}
      value={finalValue as string}
      options={finalOptions}
    />
  )
}

EventTargetWidgetSelect.displayName = "EventTargetWidgetSelect"

export default EventTargetWidgetSelect
