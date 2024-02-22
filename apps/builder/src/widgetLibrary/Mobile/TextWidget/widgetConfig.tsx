import TextWidgetIcon from "@/assets/widgetCover/text.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const TEXT_WIDGET_CONFIG: WidgetConfig = {
  displayName: "text",
  widgetName: i18n.t("widget.text.name"),
  h: 5,
  w: 6,
  type: "TEXT_WIDGET",
  icon: <TextWidgetIcon />,
  keywords: ["Text", "文本"],
  sessionType: "PRESENTATION",
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    value: i18n.t("widget.text.default_value"),
    horizontalAlign: "start",
    verticalAlign: "center",
    colorScheme: "grayBlue",
    disableMarkdown: false,
    hidden: false,
    fs: "14px",
    weight: 400,
    dynamicHeight: "fixed",
    resizeDirection: RESIZE_DIRECTION.ALL,
  },
}
