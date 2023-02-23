import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import {
  BaseComponentNodeProps,
  BaseWidgetProps,
} from "@/widgetLibrary/interface"

export interface WrappedPdfProps
  extends Omit<BaseWidgetProps, "w" | "h" | "unitH" | "unitW"> {
  width?: number
  height?: number
  scaleMode?: "width" | "height"
  url?: string
  showTollBar?: boolean
}

export interface PdfWidgetProps
  extends WrappedPdfProps,
    TooltipWrapperProps,
    BaseComponentNodeProps {}
