import { SearchIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { WidgetConfig } from "@/wrappedComponents/interface"

export const BUTTON_WIDGET_CONFIG: WidgetConfig = {
  type: "BUTTON_WIDGET",
  displayName: "button",
  icon: <SearchIcon />,
  sessionType: "BASIC",
  w: 100,
  h: 50,
  defaults: {
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
