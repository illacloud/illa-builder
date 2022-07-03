import { DateWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const DATE_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_WIDGET",
  displayName: "date",
  widgetName: i18n.t("widget.date.name"),
  icon: <DateWidgetIcon size="100%" />,
  sessionType: "CALENDAR",
  w: 20,
  h: 5,
  defaults: {
    value: "2022-06-01",
    dateFormat: "YYYY-MM-DD",
    colorScheme: "blue",
  },
}
