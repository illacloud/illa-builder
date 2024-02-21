import { ProgressProps } from "@illa-design/react"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedBarProgressProps
  extends Pick<
    ProgressProps,
    "showText" | "trailColor" | "color" | "strokeWidth"
  > {
  value?: number
}

export interface BarProgressWidgetProps
  extends WrappedBarProgressProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {}
