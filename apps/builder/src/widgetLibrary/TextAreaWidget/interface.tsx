import { TextAreaProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedTextareaProps
  extends Pick<
      TextAreaProps,
      "placeholder" | "disabled" | "readOnly" | "maxLength" | "colorScheme"
    >,
    BaseWidgetProps {
  showCharacterCount?: TextAreaProps["showWordLimit"]
  value?: string
  allowClear?: TextAreaProps["allowClear"]
  handleOnChange?: () => void
  handleOnFocus?: () => void
  handleOnBlur?: () => void
  maxLength?: number
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
  getValidateMessage: (value: string) => string
}

export interface TextareaWidgetProps
  extends WrappedTextareaProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    ValidateMessageOldProps {
  validateMessage: string
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
}
