import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"

export const SWITCH_WIDGET_CONFIG: WidgetConfig = {
  displayName: "Switch",
  h: 10,
  w: 100,
  type: "SWITCH_WIDGET",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "200px",
  },
}
