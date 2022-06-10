import { SearchIcon } from "@illa-design/icon"
import { ComponentModel } from "@/wrappedComponents/interface"
import { v4 } from "uuid"

export const SEGMENTED_CONTROL_WIDGET_CONFIG: ComponentModel = {
  type: "SEGMENTED_CONTROL_WIDGET",
  widgetName: "segmentedControl",
  version: "0.0.1",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 50,
    columns: 500,
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "500px",
    direction: "horizontal",
    options: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
  },
}
