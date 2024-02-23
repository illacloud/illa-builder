import { PADDING_MODE } from "@illa-public/public-types"
import { ValidateMessageOldProps } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedSignatureProps {
  penColor?: string
  guideColor?: string
  text?: string
  disabled?: boolean
  value?: string
  handleUpdateSignature: (value?: string, dataURI?: string) => void
}

export interface SignatureWidgetProps
  extends WrappedSignatureProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  validateMessage: string
  padding?: {
    size: string
    mode: PADDING_MODE
  }
}
