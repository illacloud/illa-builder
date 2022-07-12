import { RadioGroupWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { v4 } from "uuid"

export const RADIO_GROUP_WIDGET_CONFIG: WidgetConfig = {
  displayName: "radioGroup",
  type: "RADIO_GROUP_WIDGET",
  widgetName: "widget.radio_group.name",
  icon: <RadioGroupWidgetIcon size="100%" />,
  sessionType: "SELECT",
  w: 20,
  h: 5,
  defaults: {
    optionConfigureMode: "static",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    manualOptions: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
    dataSources: "{{[]}}",
    colorScheme: "blue",
  },
}
