import { SearchIcon } from "@illa-design/icon"
import { ComponentModel } from "@/wrappedComponents/interface"

export const RADIO_GROUP_WIDGET_CONFIG: ComponentModel = {
  type: "RADIO_GROUP_WIDGET",
  widgetName: "radioGroup",
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
    direction: "horizontal",
  },
}
