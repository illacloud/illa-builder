import { SearchIcon } from "@illa-design/icon"
import { ComponentModel } from "@/wrappedComponents/interface"

export const TEXT_WIDGET_CONFIG: ComponentModel = {
  type: "TEXT_WIDGET",
  widgetName: "text",
  version: "0.0.1",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 50,
    columns: 500,
    value: "This is a text",
    horizontalAlign: "start",
    verticalAlign: "start",
    disableMarkdown: false,
    width: "200px",
    height: "20px",
  },
}
