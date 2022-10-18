import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { TabsProps } from "@illa-design/tabs"
import { viewListItemShaper } from "@/widgetLibrary/ContainerWidget/interface"

export type HorizontalAlign = "start" | "center" | "end"
export type VerticalAlign = "start" | "center" | "end"

export interface WrappedTabsProps extends TabsProps {
  value?: string
  disable?: boolean
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
  viewList?: viewListItemShaper[]
  tabList?: viewListItemShaper[]
}

export interface TabsWidgetProps
  extends WrappedTabsProps,
    BaseWidgetProps,
    TooltipWrapperProps {
  navigateContainer?: boolean
  targetContainerId?: string
}
