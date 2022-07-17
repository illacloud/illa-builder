import { TextWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const TEXT_WIDGET_CONFIG: WidgetConfig = {
  displayName: "text",
  widgetName: "widget.text.name",
  h: 5,
  w: 12,
  type: "TEXT_WIDGET",
  icon: <TextWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  defaults: {
    value: "This is a text",
    horizontalAlign: "start",
    verticalAlign: "start",
    disableMarkdown: false,
    linkColor: "#1e6fffff",
    textColor: "#787e85ff",
    hidden: false,
  },
}
