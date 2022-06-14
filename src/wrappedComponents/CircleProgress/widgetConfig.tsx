import { WidgetConfig } from "@/wrappedComponents/interface"
import { CircleProgressIcon } from "./svg"
import i18n from "@/i18n/config"

export const CIRCLE_PROGRESS_WIDGET_CONFIG: WidgetConfig = {
  type: "CIRCLE_PROGRESS_WIDGET",
  displayName: "circleProgress",
  widgetName: i18n.t("widget.circle_progress.name"),
  icon: <CircleProgressIcon />,
  sessionType: "PRESENTATION",
  w: 100,
  h: 50,
  defaults: {
    value: 50,
    strokeWidth: "4px",
    hidden: false,
    alignment: "center",
  },
}
