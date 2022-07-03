import { TextWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const TEXT_WIDGET_CONFIG: WidgetConfig = {
  displayName: "text",
  widgetName: i18n.t("widget.text.name"),
  h: 5,
  w: 10,
  type: "TEXT_WIDGET",
  icon: <TextWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  defaults: {
    value: "This is a text",
    horizontalAlign: "start",
    verticalAlign: "start",
    disableMarkdown: false,
    linkColor: "blue",
    textColor: "gray",
  },
}
