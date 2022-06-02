import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"

export const TEXT_WIDGET_CONFIG: WidgetConfig = {
  displayName: "Text",
  h: 100,
  w: 10,
  type: "TEXT_WIDGET",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  defaults: {
    value: "This is a text",
    horizontalAlign: "start",
    verticalAlign: "start",
    disableMarkdown: false,
    width: "200px",
    height: "20px",
  },
}
