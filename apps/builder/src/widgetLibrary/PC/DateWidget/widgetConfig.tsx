import dayjs from "dayjs"
import DateWidgetIcon from "@/assets/widgetCover/date.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const DATE_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_WIDGET",
  displayName: "date",
  widgetName: i18n.t("widget.date.name"),
  icon: <DateWidgetIcon />,
  keywords: ["Date", "日期选择器"],
  sessionType: "CALENDAR",
  w: 6,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    value: dayjs().format("YYYY-MM-DD"),
    dateFormat: "YYYY-MM-DD",
    colorScheme: "blue",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    hidden: false,
    formDataKey: "radioButton",
  },
}
