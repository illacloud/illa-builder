import { ProgressProps } from "@illa-design/progress"
import {
  BaseComponentNodeProps,
  BaseWidgetProps,
} from "@/widgetLibrary/interface"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
export type Alignment = "start" | "center" | "end"
export interface WrappedCircleProgressProps
  extends Pick<
      ProgressProps,
      "showText" | "color" | "trailColor" | "strokeWidth"
    >,
    BaseComponentNodeProps {
  value?: number
}

export interface CircleProgressWidgetProps
  extends WrappedCircleProgressProps,
    BaseWidgetProps,
    BaseComponentNodeProps {}
