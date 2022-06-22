import { ProgressProps } from "@illa-design/progress"
import LabelProps from "@/wrappedComponents/Label/interface"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"

export interface WrappedBarProgressProps
  extends LabelProps,
    Pick<ProgressProps, "color" | "trailColor" | "showText" | "strokeWidth">,
    Pick<TooltipWrapperProps, "tooltipText"> {
  value?: number
  strokeWidth?: string
}
