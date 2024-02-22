import RichTextWidgetIcon from "@/assets/widgetCover/richText.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const RICH_TEXT_WIDGET_CONFIG: WidgetConfig = {
  version: 0,
  type: "RICH_TEXT_WIDGET",
  displayName: "richText",
  widgetName: i18n.t("widget.rich_text_editor.name"),
  icon: <RichTextWidgetIcon />,
  resizeDirection: RESIZE_DIRECTION.ALL,
  keywords: ["Rich Text", "富文本"],
  sessionType: "INPUTS",
  w: 20,
  h: 55,
  defaults: {
    defaultText: i18n.t(
      "editor.inspect.setter_default_value.rich_text.default_text",
    ),
    hidden: false,
    radius: "4px",
    shadow: "small",
    markdownValue: "",
    blockValue: undefined,
  },
}
