import { DividerProps } from "@illa-design/divider"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedDividerProps
  extends Pick<
    DividerProps,
    "text" | "textAlign" | "colorScheme" | "textSize"
  > {}

export interface DividerWidgetProps
  extends WrappedDividerProps,
    BaseWidgetProps {}
