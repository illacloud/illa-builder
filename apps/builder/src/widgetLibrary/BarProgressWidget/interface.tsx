import { ProgressProps } from "@illa-design/progress"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedBarProgressProps
  extends Pick<
    ProgressProps,
    "showText" | "trailColor" | "color" | "strokeWidth"
  > {
  value?: number
}

export interface BarProgressWidgetProps
  extends WrappedBarProgressProps,
    BaseWidgetProps {}
