import JsonEditorWidgetIcon from "@/assets/widgetCover/jsonEditor.svg?react"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const JSON_EDITOR_WIDGET_CONFIG: WidgetConfig = {
  type: "JSON_EDITOR_WIDGET",
  displayName: "jsonEditor",
  widgetName: i18n.t("widget.jsonEditor.name"),
  icon: <JsonEditorWidgetIcon />,
  keywords: ["JSON Editor", "JSON编辑器"],
  sessionType: "INPUTS",
  w: 10,
  h: 55,
  version: 0,
  defaults: {
    colorScheme: "grayBlue",
    hidden: false,
    value: undefined,
    defaultValue: `[{
  language: "en-US",
  userConfig: { "0-16": "planA", "17-24": "planB", "25+": "planC" },
},
{
  language: "ja-JP",
  userConfig: { "0-16": "planD", "17-24": "planE", "25+": "planF" },
}]`,
    radius: "4px",
    shadow: "small",
  },
}
