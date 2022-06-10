import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"
import i18n from "@/i18n/config"

export const TEXT_WIDGET_CONFIG: WidgetConfig = {
  displayName: "Text",
  widgetName: i18n.t("widget.text.name"),
  h: 100,
  w: 10,
  type: "TEXT_WIDGET",
  icon: <SearchIcon />,
  sessionType: "PRESENTATION",
  defaults: {
    value: "This is a text",
    horizontalAlign: "start",
    verticalAlign: "start",
    disableMarkdown: false,
    width: "200px",
    height: "20px",
  },
}
