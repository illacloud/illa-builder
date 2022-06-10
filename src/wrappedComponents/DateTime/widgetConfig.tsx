import { WidgetConfig } from "@/wrappedComponents/interface"
import { DateTimeIcon } from "./svg"

export const DATE_TIME_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_TIME_WIDGET",
  displayName: "dateTime",
  icon: <DateTimeIcon />,
  sessionType: "BASIC",
  w: 100,
  h: 50,
  defaults: {
    placeholder: "YYYY-MM-DD",
    dateFormat: "YYYY-MM-DD",
    timeFormat: "HH:mm",
    minuteStep: 1,
  },
}
