import { TabsProps } from "@illa-design/react"
import { viewListItemShaper } from "@/widgetLibrary/ContainerWidget/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedTabsProps
  extends Omit<TabsProps, "w" | "h">,
    BaseWidgetProps {
  value?: string
  disabled?: boolean
  viewList?: viewListItemShaper[]
  tabList?: viewListItemShaper[]
  linkWidgetDisplayName?: string
  handleOnChange?: () => void
  handleUpdateExecution?: (updateSliceItem: Record<string, any>) => void
}

export interface TabsWidgetProps
  extends WrappedTabsProps,
    BaseWidgetProps,
    TooltipWrapperProps {
  navigateContainer?: boolean
  linkWidgetDisplayName?: string
  currentKey?: string
}
