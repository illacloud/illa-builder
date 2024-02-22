import DividerWidgetIcon from "@/assets/widgetCover/divider.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const DIVIDER_WIDGET_CONFIG: WidgetConfig = {
  type: "DIVIDER_WIDGET",
  displayName: "divider",
  widgetName: i18n.t("widget.divider_progress.name"),
  icon: <DividerWidgetIcon />,
  keywords: ["Divider", "分割线"],
  sessionType: "PRESENTATION",
  w: 8,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    colorScheme: "grayBlue",
    fs: "14px",
    hidden: false,
  },
}
