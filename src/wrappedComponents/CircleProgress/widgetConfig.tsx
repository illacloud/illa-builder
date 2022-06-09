import { WidgetConfig } from "@/wrappedComponents/interface"
import { CircleProgressIcon } from "./svg"

export const CIRCLE_PROGRESS_WIDGET_CONFIG: WidgetConfig = {
  type: "CIRCLE_PROGRESS_WIDGET",
  displayName: "circleProgress",
  icon: <CircleProgressIcon />,
  sessionType: "BASIC",
  w: 100,
  h: 50,
  defaults: {
    value: 50,
    strokeWidth: "4px",
    hidden: false,
    alignment: "center",
  },
}
