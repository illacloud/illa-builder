import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const DIVIDER_WIDGET_CONFIG: WidgetConfig = {
  type: "DIVIDER_WIDGET",
  displayName: "divider",
  widgetName: i18n.t("widget.divider_progress.name"),
  icon: <SearchIcon />,
  sessionType: "PRESENTATION",
  w: 30,
  h: 5,
  defaults: {
    styles: {
      colorScheme: "grayBlue",
      textSize: "14px",
    },
  },
}
