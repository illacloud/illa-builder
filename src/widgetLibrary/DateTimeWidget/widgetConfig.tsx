import { DateTimeWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const DATE_TIME_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_TIME_WIDGET",
  displayName: "dateTime",
  widgetName: "widget.date_time.name",
  icon: <DateTimeWidgetIcon size="100%" />,
  sessionType: "CALENDAR",
  w: 20,
  h: 5,
  defaults: {
    placeholder: "YYYY-MM-DD",
    dateFormat: "YYYY-MM-DD",
    timeFormat: "HH:mm",
    minuteStep: "{{1}}",
    colorScheme: "blue",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    hidden: false,
  },
}
