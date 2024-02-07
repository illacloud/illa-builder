import { InputProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedInputProps
  extends Pick<
      InputProps,
      "placeholder" | "disabled" | "readOnly" | "maxLength" | "minLength"
    >,
    BaseWidgetProps {
  showCharacterCount?: InputProps["showWordLimit"]
  type?: "input" | "password" | "search"
  showVisibleButton?: boolean
  value?: string
  prefixIcon?: InputProps["prefix"]
  prefixText?: string
  suffixIcon?: InputProps["suffix"]
  suffixText?: string
  colorScheme?: InputProps["colorScheme"]
  allowClear?: InputProps["allowClear"]
  handleOnChange?: (value: string) => void
  handleOnFocus?: () => void
  handleOnBlur?: () => void
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  getValidateMessage: (value: string) => string
  clearValue: () => void
}

export interface InputWidgetProps
  extends Omit<
      WrappedInputProps,
      "maxLength" | "handleOnChange" | "handleOnFocus" | "handleOnBlur"
    >,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  defaultValue: string
  validateMessage: string
}
