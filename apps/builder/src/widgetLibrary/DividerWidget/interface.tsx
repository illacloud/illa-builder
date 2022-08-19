import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedDividerProps {
  text: string
  fs: string
}

export interface DividerWidgetProps
  extends WrappedDividerProps,
    BaseWidgetProps {}
