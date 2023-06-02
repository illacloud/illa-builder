import { ReactComponent as JsonViewerWidgetIcon } from "@/assets/widgetCover/jsonViewer.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const JSON_VIEWER_WIDGET_CONFIG: WidgetConfig = {
  type: "JSON_VIEWER_WIDGET",
  displayName: "jsonViewer",
  widgetName: i18n.t("widget.json_viewer.name"),
  icon: <JsonViewerWidgetIcon />,
  keywords: ["JSON Viewer", "JSON预览器"],
  sessionType: "PRESENTATION",
  w: 20,
  h: 55,
  defaults: {
    value: `{{[
      {
      "language": "en-US",
      "userConfig": {
      "0-16": "planA",
      "17-24": "planB",
      "25+": "planC"
        }
      },
      {
        "language": "ja-JP",
        "userConfig": {
        "0-16": "planD",
        "17-24": "planE",
        "25+": "planF"
          }
        }
      ]}}`,
    expandAll: "{{true}}",
    hidden: false,
    borderColor: "#ffffffff",
    radius: "4px",
    borderWidth: "1px",
    shadow: "small",
  },
}
