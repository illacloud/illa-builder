import { CheckboxWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { v4 } from "uuid"

export const CHECKBOX_GROUP_WIDGET_CONFIG: WidgetConfig = {
  type: "CHECKBOX_GROUP_WIDGET",
  widgetName: "checkbox",
  displayName: "checkboxGroup",
  icon: <CheckboxWidgetIcon size="100%" />,
  sessionType: "SELECT",
  w: 10,
  h: 5,
  defaults: {
    optionMode: "manual",
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
    dataSources: "{{[]}}",
  },
}
