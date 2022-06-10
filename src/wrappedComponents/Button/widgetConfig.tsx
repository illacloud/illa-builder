import { SearchIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { WidgetConfig } from "@/wrappedComponents/interface"
import i18n from "@/i18n/config"

export const BUTTON_WIDGET_CONFIG: WidgetConfig = {
  type: "BUTTON_WIDGET",
  displayName: "button",
  widgetName: i18n.t("widget.button.name"),
  icon: <SearchIcon />,
  sessionType: "PRESENTATION",
  w: 100,
  h: 50,
  defaults: {
    text: i18n.t("widget.button.default_text"),
    variant: "fill",
    submit: false,
    width: "200px",
    alignment: "fullWidth",
    backgroundColor: globalColor(`--${illaPrefix}-blue-01`),
    textColor: globalColor(`--${illaPrefix}-white-01`),
    borderColor: globalColor(`--${illaPrefix}-blue-01`),
  },
}
