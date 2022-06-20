import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"
import i18n from "@/i18n/config"

export const INPUT_WIDGET_CONFIG: WidgetConfig = {
  type: "INPUT_WIDGET",
  displayName: "input",
  widgetName: i18n.t("widget.input.name"),
  icon: <SearchIcon />,
  sessionType: "INPUTS",
  w: 10,
  h: 5,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
  },
}
