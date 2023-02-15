import { ReactComponent as IconsWidgetIcon } from "@/assets/widgetCover/icon.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const ICON_WIDGET_CONFIG: WidgetConfig = {
  type: "ICON_WIDGET",
  displayName: "icon",
  // widgetName: i18n.t("widget.input.name"),
  widgetName: "Icons",
  icon: <IconsWidgetIcon />,
  keywords: ["Icon", "图标"],
  sessionType: "PRESENTATION",
  w: 5,
  h: 5,
  defaults: {
    iconName: "RiAddCircleLine",
    colorScheme: "blue",
    hidden: false,
  },
}
