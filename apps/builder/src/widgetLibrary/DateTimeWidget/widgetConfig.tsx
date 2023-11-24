import DateTimeWidgetIcon from "@/assets/widgetCover/dateTime.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const DATE_TIME_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_TIME_WIDGET",
  displayName: "dateTime",
  widgetName: i18n.t("widget.date_time.name"),
  keywords: ["Date Time", "日期时间选择器"],
  icon: <DateTimeWidgetIcon />,
  sessionType: "CALENDAR",
  w: 10,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    placeholder: i18n.t("widget.date_time.placeholder"),
    format: "YYYY-MM-DD HH:mm:ss",
    minuteStep: "{{1}}",
    colorScheme: "blue",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    hidden: false,
    formDataKey: "radioButton",
  },
}
