import { ProgressProps } from "@illa-design/progress"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedBarProgressProps
  extends LabelProps,
    Pick<ProgressProps, "color" | "trailColor" | "showText" | "strokeWidth">,
    Pick<TooltipWrapperProps, "tooltipText"> {
  value?: number
  strokeWidth?: string
}
