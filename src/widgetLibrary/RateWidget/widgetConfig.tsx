import { RateWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const RATE_WIDGET_CONFIG: WidgetConfig = {
  type: "RATE_WIDGET",
  displayName: "rate",
  widgetName: "widget.rate.name",
  icon: <RateWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  w: 12,
  h: 5,
  defaults: {
    value: "{{4}}",
    allowHalf: true,
    maxCount: "{{5}}",
    icon: "star",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    hidden: false,
  },
}
