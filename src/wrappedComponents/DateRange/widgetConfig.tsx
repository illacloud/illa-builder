import { WidgetConfig } from "@/wrappedComponents/interface"
import { DateRangeIcon } from "./svg"
import i18n from "@/i18n/config"

export const DATE_RANGE_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_RANGE_WIDGET",
  displayName: "dateRange",
  widgetName: i18n.t("widget.date_range.name"),
  icon: <DateRangeIcon />,
  sessionType: "CALENDAR",
  w: 500,
  h: 500,
  defaults: {
    dateFormat: "YYYY-MM-DD",
    minDate: "2022-05-01",
    maxDate: "2022-05-30",
    startPlaceholder: "Start date",
    endPlaceholder: "End date",
    value: ["2022-05-02", "2022-05-03"],
  },
}
