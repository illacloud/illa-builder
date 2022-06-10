import { SearchIcon } from "@illa-design/icon"
import { ComponentModel } from "@/wrappedComponents/interface"

export const TIMELINE_WIDGET_CONFIG: ComponentModel = {
  type: "TIMELINE_WIDGET",
  widgetName: "timeline",
  version: "0.0.1",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 50,
    columns: 500,
    items: `{{["The first milestone","The second milestone","The third milestone"]}}`,
    width: "200px",
    height: "20px",
  },
}
