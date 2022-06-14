import { WidgetConfig } from "@/wrappedComponents/interface"
import { BarProgressIcon } from "./svg"
import i18n from "@/i18n/config"

export const BAR_PROGRESS_WIDGET_CONFIG: WidgetConfig = {
  type: "BAR_PROGRESS_WIDGET",
  displayName: "barProgress",
  widgetName: i18n.t("widget.bar_progress.name"),
  icon: <BarProgressIcon />,
  sessionType: "PRESENTATION",
  w: 10,
  h: 10,
  defaults: {
    value: 50,
    strokeWidth: "4px",
    hidden: false,
  },
}
