import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"
import { v4 } from "uuid"

export const SEGMENTED_CONTROL_WIDGET_CONFIG: WidgetConfig = {
  type: "SEGMENTED_CONTROL_WIDGET",
  widgetName: "segmentedControl",
  displayName: "segmentControl",
  w: 10,
  h: 5,
  icon: <SearchIcon />,
  sessionType: "PRESENTATION",
  defaults: {
    optionMode: "manual",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    direction: "horizontal",
    options: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
    dataSources: "{{[]}}",
  },
}
