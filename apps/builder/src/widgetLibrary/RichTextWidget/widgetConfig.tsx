import { ReactComponent as IconsWidgetIcon } from "@/assets/widgetCover/icon.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const RICH_TEXT_WIDGET_CONFIG: WidgetConfig = {
  type: "RICH_TEXT_WIDGET",
  displayName: "richText",
  widgetName: i18n.t("widget.richText.name"),
  icon: <IconsWidgetIcon />,
  resizeDirection: RESIZE_DIRECTION.VERTICAL,
  keywords: ["Rich Text", "富文本"],
  sessionType: "INPUTS",
  w: 30,
  h: 50,
  defaults: {
    value: `<h1>Title</h1>\n<p>Content</p>`,
    hidden: false,
  },
}
