import { ReactComponent as RateWidgetIcon } from "@/assets/widgetCover/rate.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const RATE_WIDGET_CONFIG: WidgetConfig = {
  type: "RATE_WIDGET",
  displayName: "rate",
  widgetName: i18n.t("widget.rate.name"),
  icon: <RateWidgetIcon />,
  keywords: ["Rate", "评分"],
  sessionType: "PRESENTATION",
  w: 12,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    value: "{{4}}",
    allowHalf: true,
    maxCount: "{{5}}",
    icon: "star",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    hidden: false,
  },
}
