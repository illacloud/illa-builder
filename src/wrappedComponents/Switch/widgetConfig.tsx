import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"
import { Translation } from "react-i18next"
import i18n from "@/i18n/config"

export const SWITCH_WIDGET_CONFIG: WidgetConfig = {
  displayName: "Switch",
  widgetName: i18n.t("widget.switch.name"),
  h: 10,
  w: 100,
  type: "SWITCH_WIDGET",
  icon: <SearchIcon />,
  sessionType: "SELECT",
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "200px",
  },
}
