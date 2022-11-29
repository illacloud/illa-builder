import { ProgressProps } from "@illa-design/react"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

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
