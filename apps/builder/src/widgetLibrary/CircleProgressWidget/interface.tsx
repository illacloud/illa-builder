import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import {
  BaseComponentNodeProps,
  BaseWidgetProps,
} from "@/widgetLibrary/interface"
import { ProgressProps } from "@illa-design/react"

export type Alignment = "start" | "center" | "end"
export interface WrappedCircleProgressProps
  extends Pick<
      ProgressProps,
      "showText" | "color" | "trailColor" | "strokeWidth"
    >,
    BaseComponentNodeProps {
  value?: number
  alignment?: "start" | "center" | "end"
}

export interface CircleProgressWidgetProps
  extends WrappedCircleProgressProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {}
