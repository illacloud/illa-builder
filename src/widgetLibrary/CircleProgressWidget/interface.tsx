import { ProgressProps } from "@illa-design/progress"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
export type Alignment = "start" | "center" | "end"
export interface WrappedCircleProgressProps
  extends LabelProps,
    Pick<ProgressProps, "showText" | "color" | "trailColor" | "strokeWidth">,
    Pick<TooltipWrapperProps, "tooltipText"> {
  value?: number
}
