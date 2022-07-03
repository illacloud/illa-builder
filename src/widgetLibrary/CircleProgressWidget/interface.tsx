import { ProgressProps } from "@illa-design/progress"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
export type Alignment = "start" | "center" | "end"
export interface WrappedCircleProgressProps
  extends Pick<
    ProgressProps,
    "showText" | "color" | "trailColor" | "strokeWidth"
  > {
  value?: number
}
