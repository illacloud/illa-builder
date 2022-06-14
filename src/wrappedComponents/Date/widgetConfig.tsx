import { WidgetConfig } from "@/wrappedComponents/interface"
import { DateIcon } from "@/wrappedComponents/Date/svg"
import i18n from "@/i18n/config"

export const DATE_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_WIDGET",
  displayName: "date",
  widgetName: i18n.t("widget.date.name"),
  icon: <DateIcon />,
  sessionType: "CALENDAR",
  w: 10,
  h: 5,
  defaults: {
    defaultValue: "2022-06-01",
    dateFormat: "YYYY-MM-DD",
  },
}
