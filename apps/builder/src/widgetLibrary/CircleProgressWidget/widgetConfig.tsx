import { CircleProgressWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const CIRCLE_PROGRESS_WIDGET_CONFIG: WidgetConfig = {
  type: "CIRCLE_PROGRESS_WIDGET",
  displayName: "circleProgress",
  widgetName: i18n.t("widget.circle_progress.name"),
  keywords: ["Circle Progress", "圆形进度条"],
  icon: <CircleProgressWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  w: 6,
  h: 12,
  defaults: {
    value: "50",
    alignment: "center",
    color: "blue",
    trailColor: "gray",
    strokeWidth: "4px",
  },
}
