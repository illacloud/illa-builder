import { ProgressProps } from "@illa-design/progress"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
export type Alignment = "start" | "center" | "end"
export interface WrappedCircleProgressProps
  extends Pick<
    ProgressProps,
    "showText" | "color" | "trailColor" | "strokeWidth"
  > {
  value?: number
}

export interface CircleProgressWidgetProps
  extends WrappedCircleProgressProps,
    BaseWidgetProps {}
