import { ReactComponent as RichTextWidgetIcon } from "@/assets/widgetCover/richText.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const RICH_TEXT_WIDGET_CONFIG: WidgetConfig = {
  type: "RICH_TEXT_WIDGET",
  displayName: "richText",
  widgetName: i18n.t("widget.rich_text_editor.name"),
  icon: <RichTextWidgetIcon />,
  resizeDirection: RESIZE_DIRECTION.ALL,
  keywords: ["Rich Text", "富文本"],
  sessionType: "INPUTS",
  w: 35,
  h: 65,
  defaults: {
    value: `<h1>Title</h1>\n<p>Content</p>`,
    hidden: false,
  },
}
