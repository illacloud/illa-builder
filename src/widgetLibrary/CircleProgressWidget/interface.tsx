import { ProgressProps } from "@illa-design/progress"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"

export interface WrappedCircleProgressProps
  extends LabelProps,
    Pick<ProgressProps, "color" | "trailColor" | "showText" | "strokeWidth">,
    Pick<TooltipWrapperProps, "tooltipText"> {
  value?: number
}
