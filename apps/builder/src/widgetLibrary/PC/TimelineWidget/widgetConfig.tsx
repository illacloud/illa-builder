import TimelineWidgetIcon from "@/assets/widgetCover/timeline.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const TIMELINE_WIDGET_CONFIG: WidgetConfig = {
  type: "TIMELINE_WIDGET",
  widgetName: i18n.t("widget.timeline.name"),
  displayName: "timeline",
  icon: <TimelineWidgetIcon />,
  keywords: ["Timeline", "时间线"],
  sessionType: "PRESENTATION",
  w: 6,
  h: 28,
  version: 0,
  defaults: {
    direction: "vertical",
    items: `{{["The first milestone","The second milestone","The third milestone"]}}`,
    hidden: false,
    dynamicHeight: "fixed",
    resizeDirection: RESIZE_DIRECTION.ALL,
  },
}
