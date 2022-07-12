import { CircleProgressWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const CIRCLE_PROGRESS_WIDGET_CONFIG: WidgetConfig = {
  type: "CIRCLE_PROGRESS_WIDGET",
  displayName: "circleProgress",
  widgetName: "widget.circle_progress.name",
  icon: <CircleProgressWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  w: 10,
  h: 10,
  defaults: {
    value: "50",
    hidden: "false",
    alignment: "center",
    color: "blue",
    trailColor: "gray",
    strokeWidth: "4px",
  },
}
