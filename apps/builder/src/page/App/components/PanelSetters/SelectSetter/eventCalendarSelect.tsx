import { FC, useMemo } from "react"
import BaseSelectSetter from "./baseSelect"
import { BaseSelectSetterProps } from "./interface"

const EventCalendarSelect: FC<BaseSelectSetterProps> = (props) => {
  const { value, options, panelConfig } = props
  const finalOptions = useMemo(() => {
    if (panelConfig && panelConfig.showResource) {
      return options.filter(({ _, value }: Record<string, any>) => {
        return value !== "month" && value !== "agenda"
      })
    } else {
      return options
    }
  }, [options, panelConfig])

  const finalValue = useMemo(() => {
    if (panelConfig && panelConfig.showResource) {
      if (value !== "week" && value !== "day") {
        return "day"
      }
    }
    return value
  }, [panelConfig, value])
  return (
    <BaseSelectSetter {...props} value={finalValue} options={finalOptions} />
  )
}

EventCalendarSelect.displayName = "EventCalendarSelect"

export default EventCalendarSelect
