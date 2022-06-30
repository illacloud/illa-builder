import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const CIRCLE_PROGRESS_WIDGET_CONFIG: WidgetConfig = {
  type: "CIRCLE_PROGRESS_WIDGET",
  displayName: "circleProgress",
  widgetName: i18n.t("widget.circle_progress.name"),
  icon: <SearchIcon />,
  sessionType: "PRESENTATION",
  w: 10,
  h: 10,
  defaults: {
    value: "50",
    strokeWidth: "4px",
    hidden: "false",
    alignment: "center",
  },
}
