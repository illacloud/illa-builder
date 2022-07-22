import { InputProps } from "@illa-design/input"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedEditableTextProps
  extends ValidateMessageProps,
    Pick<InputProps, "placeholder" | "disabled" | "readOnly"> {
  showCharacterCount?: InputProps["showCount"]
  value?: string
  className?: string
  prefixIcon?: InputProps["prefix"]
  prefixText?: InputProps["addonBefore"]
  suffixIcon?: InputProps["suffix"]
  suffixText?: InputProps["addonAfter"]
  tooltipText?: string
  handleUpdateDsl: (value: any) => void
  colorScheme?: InputProps["borderColor"]
  allowClear?: InputProps["allowClear"]
}

export interface EditableTextWidgetProps
  extends WrappedEditableTextProps,
    BaseWidgetProps {}
