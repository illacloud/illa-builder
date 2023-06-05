import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface BaseJsonViewerWidgetProps {
  value?: string
  expandAll?: boolean
}

export interface JsonViewerWidgetProps
  extends BaseWidgetProps,
    BaseJsonViewerWidgetProps,
    Pick<TooltipWrapperProps, "tooltipText"> {
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}
