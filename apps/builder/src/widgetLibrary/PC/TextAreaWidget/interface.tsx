import { TextAreaProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedTextareaProps
  extends Pick<
      TextAreaProps,
      "placeholder" | "disabled" | "readOnly" | "maxLength" | "colorScheme"
    >,
    BaseWidgetProps,
    LabelProps {
  showCharacterCount?: TextAreaProps["showWordLimit"]
  value?: string
  allowClear?: TextAreaProps["allowClear"]
  handleOnChange: (value: string) => void
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
  showValidationMessage: boolean
}

export interface TextareaWidgetProps
  extends WrappedTextareaProps,
    BaseWidgetProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  validateMessage: string
  dynamicHeight: "auto" | "fixed" | "limited"
  dynamicMinHeight?: number
  dynamicMaxHeight?: number
  defaultValue?: string
}
