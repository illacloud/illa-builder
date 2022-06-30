import { ProgressProps } from "@illa-design/progress"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"

export interface WrappedCircleProgressProps
  extends LabelProps,
    Pick<ProgressProps, "showText">,
    Pick<TooltipWrapperProps, "tooltipText"> {
  value?: number
  styles?: {
    color?: ProgressProps["color"]
    trailColor?: ProgressProps["trailColor"]
    strokeWidth?: ProgressProps["strokeWidth"]
  }
}
