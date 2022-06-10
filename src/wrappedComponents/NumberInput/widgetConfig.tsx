import { SearchIcon } from "@illa-design/icon"
import { ComponentModel } from "@/wrappedComponents/interface"

export const NUMBER_INPUT_WIDGET_CONFIG: ComponentModel = {
  type: "NUMBER_INPUT_WIDGET",
  widgetName: "number input",
  version: "0.0.1",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "400px",
  },
}
