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
  prefixText?: InputProps["addonBefore"]
  suffixIcon?: InputProps["suffix"]
  suffixText?: InputProps["addonAfter"]
  tooltipText?: string
  colorScheme?: InputProps["borderColor"]
}
