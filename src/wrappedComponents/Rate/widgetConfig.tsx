import { WidgetConfig } from "@/wrappedComponents/interface"
import { RateIcon } from "./svg"

export const RATE_WIDGET_CONFIG: WidgetConfig = {
  type: "RATE_WIDGET",
  displayName: "rate",
  icon: <RateIcon />,
  sessionType: "BASIC",
  w: 100,
  h: 50,
  defaults: {
    value: 4.5,
    allowHalf: true,
    maxCount: 5,
  },
}
