import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { TabsProps } from "@illa-design/tabs"
import { viewListItemShaper } from "@/widgetLibrary/ContainerWidget/interface"

export type HorizontalAlign = "start" | "center" | "end"

export interface WrappedTabsProps extends TabsProps, BaseWidgetProps {
  value?: string
  disabled?: boolean
  horizontalAlign?: HorizontalAlign
  viewList?: viewListItemShaper[]
  tabList?: viewListItemShaper[]
  handleOnChange?: () => void
}

export interface TabsWidgetProps
  extends WrappedTabsProps,
    BaseWidgetProps,
    TooltipWrapperProps {
  navigateContainer?: boolean
  linkWidgetDisplayName?: string
  currentKey?: string
}
