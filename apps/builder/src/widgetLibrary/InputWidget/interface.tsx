import { InputProps } from "@illa-design/input"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

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
}

export interface InputWidgetProps
  extends WrappedInputProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageProps, "value"> {}
