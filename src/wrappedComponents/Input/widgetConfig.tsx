import { ComponentModel } from "@/wrappedComponents/interface"
import { InputIcon } from "@/wrappedComponents/Input/svg"

export const INPUT_WIDGET_CONFIG: ComponentModel = {
  type: "INPUT_WIDGET",
  widgetName: "input",
  version: "0.0.1",
  icon: <InputIcon />,
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
