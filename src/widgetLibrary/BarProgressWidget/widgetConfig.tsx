import { LineProgressWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const BAR_PROGRESS_WIDGET_CONFIG: WidgetConfig = {
  type: "BAR_PROGRESS_WIDGET",
  displayName: "barProgress",
  widgetName: "widget.bar_progress.name",
  icon: <LineProgressWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  w: 16,
  h: 5,
  defaults: {
    value: "50",
    color: "blue",
    trailColor: "gray",
    strokeWidth: "4px",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
  },
}
