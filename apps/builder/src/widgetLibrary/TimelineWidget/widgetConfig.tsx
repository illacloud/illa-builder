import { ReactComponent as TimelineWidgetIcon } from "@/assets/widgetCover/timeline.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const TIMELINE_WIDGET_CONFIG: WidgetConfig = {
  type: "TIMELINE_WIDGET",
  widgetName: i18n.t("widget.timeline.name"),
  displayName: "timeline",
  icon: <TimelineWidgetIcon />,
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
