import { ProgressProps } from "@illa-design/progress"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedBarProgressProps
  extends LabelProps,
    Pick<ProgressProps, "showText" | "trailColor" | "color" | "strokeWidth">,
    Pick<TooltipWrapperProps, "tooltipText"> {
  value?: number
}
