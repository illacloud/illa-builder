import IconsWidgetIcon from "@/assets/widgetCover/icon.svg?react"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const ICON_WIDGET_CONFIG: WidgetConfig = {
  type: "ICON_WIDGET",
  displayName: "icon",
  widgetName: i18n.t("widget.icon.name"),
  icon: <IconsWidgetIcon />,
  keywords: ["Icon", "图标"],
  sessionType: "PRESENTATION",
  w: 1,
  h: 4,
  version: 0,
  defaults: {
    iconName: "BsHandThumbsUp",
    colorScheme: "grayBlue",
    hidden: false,
  },
}
