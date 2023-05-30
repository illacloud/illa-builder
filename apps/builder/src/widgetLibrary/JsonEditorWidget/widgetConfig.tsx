import { ReactComponent as IconsWidgetIcon } from "@/assets/widgetCover/icon.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const JSON_EDITOR_WIDGET_CONFIG: WidgetConfig = {
  type: "JSON_EDITOR_WIDGET",
  displayName: "jsonEditor",
  widgetName: i18n.t("widget.jsonEditor.name"),
  icon: <IconsWidgetIcon />,
  keywords: ["JSON Editor", "JSON编辑器"],
  sessionType: "INPUTS",
  w: 30,
  h: 55,
  defaults: {
    colorScheme: "grayBlue",
    hidden: false,
    value: `[{ "language": "en-US", "userConfig": { "0-16": "planA", "17-24": "planB", "25+": "planC" }, "language": "ja-JP", "userConfig": { "0-16": "planD", "17-24": "planE", "25+": "planF" }}]`,
  },
}
