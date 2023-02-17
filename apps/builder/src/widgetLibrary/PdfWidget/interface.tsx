import { InputProps } from "@illa-design/react"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import {
  BaseComponentNodeProps,
  BaseWidgetProps,
} from "@/widgetLibrary/interface"

export interface WrappedPdfProps extends BaseWidgetProps {
  width?: number
  height?: number
  scaleMode?: "width" | "height"
  value?: string
  colorScheme?: InputProps["colorScheme"]
  handleOnChange?: () => void
  handleOnFocus?: () => void
  handleOnBlur?: () => void
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
}

export interface PdfWidgetProps
  extends Omit<WrappedPdfProps, "maxLength">,
    BaseWidgetProps,
    TooltipWrapperProps,
    BaseComponentNodeProps {
  validateMessage: string
}
