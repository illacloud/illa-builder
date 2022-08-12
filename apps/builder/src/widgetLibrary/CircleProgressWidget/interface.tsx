import { ProgressProps } from "@illa-design/progress"
import {
  BaseComponentNodeProps,
  BaseWidgetProps,
} from "@/widgetLibrary/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
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
    BaseComponentNodeProps,
    LabelProps,
    TooltipWrapperProps {}
