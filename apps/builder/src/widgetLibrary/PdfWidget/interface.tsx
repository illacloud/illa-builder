import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import {
  BaseComponentNodeProps,
  BaseWidgetProps,
} from "@/widgetLibrary/interface"

// todo: @echoxyc error extends.Refactor.
export interface WrappedPdfProps
  extends Omit<BaseWidgetProps, "w" | "h" | "unitH" | "unitW"> {
  width?: number
  height?: number
  scaleMode?: "width" | "height"
  url?: string
  showToolBar?: boolean
}

export interface PdfWidgetProps
  extends WrappedPdfProps,
    TooltipWrapperProps,
    BaseComponentNodeProps {}
