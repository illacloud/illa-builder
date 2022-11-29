import { ReactComponent as DateWidgetIcon } from "@/assets/widgetCover/date.svg"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"
import dayjs from "dayjs"
import i18n from "@/i18n/config"

export const DATE_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_WIDGET",
  displayName: "date",
  widgetName: i18n.t("widget.date.name"),
  icon: <DateWidgetIcon />,
  keywords: ["Date", "日期选择器"],
  sessionType: "CALENDAR",
  w: 12,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
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
