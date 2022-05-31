import { globalColor, illaPrefix } from "@illa-design/theme"
import { ComponentModel } from "@/wrappedComponents/interface"
import { ButtonIcon } from "@/wrappedComponents/Button/svg"

export const BUTTON_WIDGET_CONFIG: ComponentModel = {
  type: "BUTTON_WIDGET",
  widgetName: "button",
  version: "0.0.1",
  icon: <ButtonIcon />,
  sessionType: "BASIC",
  defaults: {
    rows: 50,
    columns: 500,
    text: "Button",
    variant: "fill",
    submit: false,
    width: "200px",
    alignment: "fullWidth",
    backgroundColor: globalColor(`--${illaPrefix}-blue-01`),
    textColor: globalColor(`--${illaPrefix}-white-01`),
    borderColor: globalColor(`--${illaPrefix}-blue-01`),
  },
}
