import { WidgetConfig } from "@/wrappedComponents/interface"
import { DateIcon } from "@/wrappedComponents/Date/svg"

export const DATE_WIDGET_CONFIG: WidgetConfig = {
  type: "DATE_WIDGET",
  displayName: "date",
  icon: <DateIcon />,
  sessionType: "BASIC",
  w: 100,
  h: 50,
  defaults: {
    defaultValue: "2022-06-01",
    dateFormat: "MMM d, yyyy",
  },
}
