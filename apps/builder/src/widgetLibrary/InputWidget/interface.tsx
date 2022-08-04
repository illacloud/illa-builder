import { InputProps } from "@illa-design/input"
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
  tooltipText?: string
  colorScheme?: InputProps["borderColor"]
  allowClear?: InputProps["allowClear"]
}

export interface InputWidgetProps extends WrappedInputProps, BaseWidgetProps {}
