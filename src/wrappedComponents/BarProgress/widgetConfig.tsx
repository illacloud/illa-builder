import { WidgetConfig } from "@/wrappedComponents/interface"
import { BarProgressIcon } from "./svg"

export const BAR_PROGRESS_WIDGET_CONFIG: WidgetConfig = {
  type: "BAR_PROGRESS_WIDGET",
  displayName: "barProgress",
  icon: <BarProgressIcon />,
  sessionType: "BASIC",
  w: 500,
  h: 500,
  defaults: {
    value: 50,
    strokeWidth: "4px",
    hidden: false,
  },
}
