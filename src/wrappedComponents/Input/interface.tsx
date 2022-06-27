import { InputProps } from "@illa-design/input"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"
import LabelProps from "@/wrappedComponents/Label/interface"

export interface WrappedInputProps
  extends LabelProps,
    ValidateMessageProps,
    Pick<TooltipWrapperProps, "tooltipText">,
    Pick<InputProps, "placeholder" | "disabled" | "readOnly"> {
  showCharacterCount?: InputProps["showCount"]
  value?: string
  prefixIcon?: InputProps["prefix"]
  prefixText?: InputProps["addonBefore"]
  suffixIcon?: InputProps["suffix"]
  suffixText?: InputProps["addonAfter"]
  tooltipText?: string
  handleUpdateDsl: (value: Record<string, string>) => void
}
