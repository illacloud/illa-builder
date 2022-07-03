import { SwitchWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const SWITCH_WIDGET_CONFIG: WidgetConfig = {
  displayName: "switch",
  widgetName: i18n.t("widget.switch.name"),
  h: 5,
  w: 10,
  type: "SWITCH_WIDGET",
  icon: <SwitchWidgetIcon size="100%" />,
  sessionType: "SELECT",
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    colorScheme: "blue",
  },
}
