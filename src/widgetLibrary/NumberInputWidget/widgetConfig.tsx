import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const NUMBER_INPUT_WIDGET_CONFIG: WidgetConfig = {
  type: "NUMBER_INPUT_WIDGET",
  widgetName: "number input",
  displayName: "numberInput",
  icon: <SearchIcon />,
  sessionType: "INPUTS",
  w: 10,
  h: 5,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "400px",
  },
}
