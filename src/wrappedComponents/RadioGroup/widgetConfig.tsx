import { ComponentModel } from "@/wrappedComponents/interface"
import { RadioGroupIcon } from "@/wrappedComponents/RadioGroup/svg"

export const RADIO_GROUP_WIDGET_CONFIG: ComponentModel = {
  type: "RADIO_GROUP_WIDGET",
  widgetName: "radioGroup",
  version: "0.0.1",
  icon: <RadioGroupIcon />,
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
