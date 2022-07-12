import { DividerWidgetIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"

export const DIVIDER_WIDGET_CONFIG: WidgetConfig = {
  type: "DIVIDER_WIDGET",
  displayName: "divider",
  widgetName: "widget.divider_progress.name",
  icon: <DividerWidgetIcon size="100%" />,
  sessionType: "PRESENTATION",
  w: 30,
  h: 5,
  defaults: {
    colorScheme: "grayBlue",
    textSize: "14px",
  },
}
