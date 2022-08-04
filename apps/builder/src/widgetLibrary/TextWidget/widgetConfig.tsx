import { TextWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const TEXT_WIDGET_CONFIG: WidgetConfig = {
  displayName: "text",
  widgetName: i18n.t("widget.text.name"),
  h: 5,
  w: 12,
  type: "TEXT_WIDGET",
  icon: <TextWidgetIcon size="100%" />,
  keywords: ["Text", "文本"],
  sessionType: "PRESENTATION",
  defaults: {
    value: i18n.t("widget.text.default_value"),
    horizontalAlign: "start",
    verticalAlign: "center",
    textColor: "#787e85ff",
    disableMarkdown: false,
    hidden: false,
    fontSize: "14px",
  },
}
