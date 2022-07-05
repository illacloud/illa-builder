import { InputProps } from "@illa-design/input"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

export interface WrappedInputProps
  extends ValidateMessageProps,
    Pick<InputProps, "placeholder" | "disabled" | "readOnly"> {
  showCharacterCount?: InputProps["showCount"]
  value?: string
  prefixIcon?: InputProps["prefix"]
  prefixText?: InputProps["addonBefore"]
  suffixIcon?: InputProps["suffix"]
  suffixText?: InputProps["addonAfter"]
  tooltipText?: string
  handleUpdateDsl: (value: Record<string, string>) => void
  colorScheme?: InputProps["borderColor"]
}
