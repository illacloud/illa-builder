import { InputProps } from "@illa-design/input"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedInputProps
  extends ValidateMessageProps,
    Pick<InputProps, "placeholder" | "disabled" | "readOnly">,
    BaseWidgetProps {
  showCharacterCount?: InputProps["showCount"]
  value?: string
  prefixIcon?: InputProps["prefix"]
  prefixText?: string
  suffixIcon?: InputProps["suffix"]
  suffixText?: string
  tooltipText?: string
  colorScheme?: InputProps["borderColor"]
  allowClear?: InputProps["allowClear"]
}

export interface InputWidgetProps extends WrappedInputProps, BaseWidgetProps {}
