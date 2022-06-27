import { ProgressProps } from "@illa-design/progress"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"
import LabelProps from "@/wrappedComponents/Label/interface"

export interface WrappedCircleProgressProps
  extends LabelProps,
    Pick<ProgressProps, "color" | "trailColor" | "showText" | "strokeWidth">,
    Pick<TooltipWrapperProps, "tooltipText"> {
  value?: number
}
