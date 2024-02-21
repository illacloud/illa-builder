import { ProgressProps } from "@illa-design/react"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import {
  BaseComponentNodeProps,
  BaseWidgetProps,
} from "@/widgetLibrary/interface"

export type Alignment = "start" | "center" | "end"
export interface WrappedCircleProgressProps
  extends Pick<
      ProgressProps,
      "showText" | "color" | "trailColor" | "strokeWidth"
    >,
    BaseComponentNodeProps {
  value?: number
  alignment?: "start" | "center" | "end"
  finalHeight: number
  finalWidth: number
}

export interface CircleProgressWidgetProps
  extends WrappedCircleProgressProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {}
