import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import {
  BaseComponentNodeProps,
  BaseWidgetProps,
} from "@/widgetLibrary/interface"

export interface WrappedPdfProps extends BaseWidgetProps {
  width?: number
  height?: number
  scaleMode?: "width" | "height"
  url?: string
  showTollBar?: boolean
}

export interface PdfWidgetProps
  extends Omit<WrappedPdfProps, "maxLength">,
    BaseWidgetProps,
    TooltipWrapperProps,
    BaseComponentNodeProps {}
