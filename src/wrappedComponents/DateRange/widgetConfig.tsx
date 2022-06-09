import { WidgetConfig } from "@/wrappedComponents/interface"
import { DateRangeIcon } from "./svg"

export const DATE_RANGE_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_RANGE_WIDGET",
  displayName: "dateRange",
  icon: <DateRangeIcon />,
  sessionType: "BASIC",
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
