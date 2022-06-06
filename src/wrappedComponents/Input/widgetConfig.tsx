import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"

export const INPUT_WIDGET_CONFIG: WidgetConfig = {
  type: "INPUT_WIDGET",
  displayName: "input",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  w: 100,
  h: 10,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "400px",
  },
}
