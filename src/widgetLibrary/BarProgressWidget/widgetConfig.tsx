import { LineProgressWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const BAR_PROGRESS_WIDGET_CONFIG: WidgetConfig = {
  type: "BAR_PROGRESS_WIDGET",
  displayName: "barProgress",
  widgetName: "widget.bar_progress.name",
  icon: <LineProgressWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  w: 17,
  h: 10,
  defaults: {
    value: "50",
    hidden: "false",
    color: "blue",
    trailColor: "gray",
    strokeWidth: "4px",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
  },
}
