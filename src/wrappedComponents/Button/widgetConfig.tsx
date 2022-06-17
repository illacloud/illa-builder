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
  w: 10,
  h: 5,
  defaults: {
    text: i18n.t("widget.button.default_text"),
    variant: "fill",
    submit: false,
    width: "200px",
    alignment: "fullWidth",
    colorScheme: "blue",
  },
}
