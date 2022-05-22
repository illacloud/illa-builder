import { SearchIcon } from "@illa-design/icon"
import { ComponentModel } from "../interface"

export const SWITCH_WIDGET_CONFIG: ComponentModel = {
  type: "SWITCH_WIDGET",
  widgetName: "switch",
  version: "0.0.1",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 50,
    columns: 500,
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "200px",
  },
}
