import { CheckboxWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { v4 } from "uuid"

export const CHECKBOX_GROUP_WIDGET_CONFIG: WidgetConfig = {
  type: "CHECKBOX_GROUP_WIDGET",
  widgetName: "widget.check_box_group.name",
  displayName: "checkboxGroup",
  icon: <CheckboxWidgetIcon size="100%" />,
  sessionType: "SELECT",
  w: 20,
  h: 5,
  defaults: {
    optionConfigureMode: "static",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{10}}",
    manualOptions: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
    dataSources: "{{[]}}",
    direction: "horizontal",
    colorScheme: "blue",
  },
}
