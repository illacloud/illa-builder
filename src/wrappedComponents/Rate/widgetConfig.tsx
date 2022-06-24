import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"
import i18n from "@/i18n/config"

export const RATE_WIDGET_CONFIG: WidgetConfig = {
  type: "RATE_WIDGET",
  displayName: "rate",
  widgetName: i18n.t("widget.rate.name"),
  icon: <SearchIcon />,
  sessionType: "PRESENTATION",
  w: 10,
  h: 5,
  defaults: {
    value: "{{4.5}}",
    allowHalf: true,
    maxCount: "{{5}}",
  },
}
