import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"
import { v4 } from "uuid"

export const SELECT_WIDGET_CONFIG: WidgetConfig = {
  type: "SELECT_WIDGET",
  displayName: "select",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  w: 100,
  h: 20,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "200px",
    value: "Option 1",
    options: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
  },
}
