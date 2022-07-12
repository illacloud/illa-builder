import { RadioButtonWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { v4 } from "uuid"

export const SEGMENTED_CONTROL_WIDGET_CONFIG: WidgetConfig = {
  type: "SEGMENTED_CONTROL_WIDGET",
  widgetName: "widget.segmented_control.name",
  displayName: "segmentControl",
  w: 10,
  h: 5,
  icon: <RadioButtonWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
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
