import { ButtonWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const DROPDOWN_BUTTON_WIDGET_CONFIG: WidgetConfig = {
  type: "DROPDOWN_BUTTON_WIDGET",
  displayName: "dropdownButton",
  widgetName: "widget.dropdown_button.name",
  icon: <ButtonWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  w: 10,
  h: 5,
  defaults: {
    defaultValue: "menu",
  },
}
