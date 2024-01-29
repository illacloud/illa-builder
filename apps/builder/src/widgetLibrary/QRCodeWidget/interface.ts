import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedQRCodeProps extends QRCodeWidgetProps {}

export interface QRCodeWidgetProps
  extends BaseWidgetProps,
    TooltipWrapperProps {
  value?: unknown
  bgColorSchema?: string
  fgColorSchema?: string
}
