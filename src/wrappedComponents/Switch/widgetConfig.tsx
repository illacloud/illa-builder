import { ComponentModel } from "@/wrappedComponents/interface"
import { SwitchIcon } from "./svg"

export const SWITCH_WIDGET_CONFIG: ComponentModel = {
  type: "SWITCH_WIDGET",
  widgetName: "switch",
  version: "0.0.1",
  icon: <SwitchIcon />,
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
