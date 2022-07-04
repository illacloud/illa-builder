import { LineProgressWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const BAR_PROGRESS_WIDGET_CONFIG: WidgetConfig = {
  type: "BAR_PROGRESS_WIDGET",
  displayName: "barProgress",
  widgetName: i18n.t("widget.bar_progress.name"),
  icon: <LineProgressWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  w: 10,
  h: 10,
  defaults: {
    value: "50",
    strokeWidth: "4px",
    hidden: "false",
    styles: {
      color: "blue",
      trailColor: "gray",
      strokeWidth: "4px",
    },
  },
}
