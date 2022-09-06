import { SwitchWidgetIcon } from "@illa-design/icon"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const SWITCH_WIDGET_CONFIG: WidgetConfig = {
  displayName: "switch",
  widgetName: i18n.t("widget.switch.name"),
  h: 5,
  w: 10,
  type: "SWITCH_WIDGET",
  icon: <SwitchWidgetIcon size="100%" />,
  keywords: ["Switch", "开关"],
  sessionType: "SELECT",
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    labelFull: "{{true}}",
    colorScheme: "blue",
    hidden: "{{false}}",
  },
}
