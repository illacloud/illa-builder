import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const TIMELINE_WIDGET_CONFIG: WidgetConfig = {
  type: "TIMELINE_WIDGET",
  widgetName: "timeline",
  displayName: "timeline",
  icon: <SearchIcon />,
  sessionType: "PRESENTATION",
  w: 10,
  h: 5,
  defaults: {
    items: `{{["The first milestone","The second milestone","The third milestone"]}}`,
    width: "200px",
    height: "20px",
  },
}
