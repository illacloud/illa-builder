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
  showCharacterCount?: InputProps["showCount"]
  value?: string
  prefixIcon?: InputProps["prefix"]
  prefixText?: string
  suffixIcon?: InputProps["suffix"]
  suffixText?: string
  colorScheme?: InputProps["borderColor"]
  allowClear?: InputProps["allowClear"]
  handleOnChange?: () => void
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  getValidateMessage: (value: string) => string
}

export interface InputWidgetProps
  extends WrappedInputProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  validateMessage: string
}
