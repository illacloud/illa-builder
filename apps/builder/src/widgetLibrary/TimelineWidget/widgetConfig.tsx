import { TimelineWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const TIMELINE_WIDGET_CONFIG: WidgetConfig = {
  type: "TIMELINE_WIDGET",
  widgetName: i18n.t("widget.timeline.name"),
  displayName: "timeline",
  icon: <TimelineWidgetIcon size="100%" />,
  keywords: ["Timeline", "时间线"],
  sessionType: "PRESENTATION",
  w: 12,
  h: 28,
  defaults: {
    direction: "vertical",
    items: `{{["The first milestone","The second milestone","The third milestone"]}}`,
    width: "200px",
    height: "20px",
    hidden: false,
  },
}
