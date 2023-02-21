import { ReactComponent as TextWidgetIcon } from "@/assets/widgetCover/text.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const TEXT_WIDGET_CONFIG: WidgetConfig = {
  displayName: "text",
  widgetName: i18n.t("widget.text.name"),
  h: 5,
  w: 12,
  type: "TEXT_WIDGET",
  icon: <TextWidgetIcon />,
  keywords: ["Text", "文本"],
  sessionType: "PRESENTATION",
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    value: i18n.t("widget.text.default_value"),
    horizontalAlign: "start",
    verticalAlign: "center",
    colorScheme: "grayBlue",
    disableMarkdown: false,
    hidden: false,
    fs: "14px",
    dynamicHeight: "fixed",
    resizeDirection: RESIZE_DIRECTION.ALL,
  },
}
