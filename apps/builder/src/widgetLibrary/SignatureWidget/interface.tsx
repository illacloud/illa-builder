import { PADDING_MODE } from "@illa-public/public-types"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
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
  backgroundColor?: string
}

export interface ICustomRef {
  clear: () => void
}
