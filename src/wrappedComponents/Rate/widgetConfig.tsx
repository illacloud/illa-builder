import { WidgetConfig } from "@/wrappedComponents/interface"
import { RateIcon } from "./svg"
import i18n from "@/i18n/config"

export const RATE_WIDGET_CONFIG: WidgetConfig = {
  type: "RATE_WIDGET",
  displayName: "rate",
  widgetName: i18n.t("widget.rate.name"),
  icon: <RateIcon />,
  sessionType: "PRESENTATION",
  w: 100,
  h: 50,
  defaults: {
    value: 4.5,
    allowHalf: true,
    maxCount: 5,
  },
}
