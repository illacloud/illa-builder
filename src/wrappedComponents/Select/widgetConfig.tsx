import { SearchIcon } from "@illa-design/icon"
import { ComponentModel } from "../interface"

export const SELECT_WIDGET_CONFIG: ComponentModel = {
  type: "SELECT_WIDGET",
  widgetName: "select",
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
