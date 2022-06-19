import { WidgetConfig } from "@/wrappedComponents/interface"
import i18n from "@/i18n/config"
import { DividerIcon } from "./svg"

export const DIVIDER_WIDGET_CONFIG: WidgetConfig = {
  type: "DIVIDER_WIDGET",
  displayName: "divider",
  widgetName: i18n.t("widget.divider_progress.name"),
  icon: <DividerIcon />,
  sessionType: "PRESENTATION",
  w: 30,
  h: 5,
  defaults: {
    color: "grayBlue",
    textAlign: "center",
  },
}
