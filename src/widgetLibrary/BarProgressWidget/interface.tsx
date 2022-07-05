import { ProgressProps } from "@illa-design/progress"

export interface WrappedBarProgressProps
  extends Pick<
    ProgressProps,
    "showText" | "trailColor" | "color" | "strokeWidth"
  > {
  value?: number
}
