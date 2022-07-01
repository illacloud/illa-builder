import { ProgressProps } from "@illa-design/progress"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedBarProgressProps
  extends LabelProps,
    Pick<ProgressProps, "showText">,
    Pick<TooltipWrapperProps, "tooltipText"> {
  value?: number
  styles?: {
    trailColor?: ProgressProps["trailColor"]
    color?: ProgressProps["color"]
    strokeWidth?: ProgressProps["strokeWidth"]
  }
}
