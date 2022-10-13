import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { TabsProps } from "@illa-design/tabs"

export type HorizontalAlign = "start" | "center" | "end"
export type VerticalAlign = "start" | "center" | "end"

export interface WrappedTabsProps extends TabsProps {
  value?: string
  disableMarkdown?: boolean
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
}

export interface TabsWidgetProps
  extends WrappedTabsProps,
    BaseWidgetProps,
    TooltipWrapperProps {}
