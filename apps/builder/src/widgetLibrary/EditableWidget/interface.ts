import { InputProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedEditableTextProps
  extends Pick<
    InputProps,
    "placeholder" | "disabled" | "readOnly" | "maxLength" | "minLength"
  > {
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
    BaseWidgetProps,
    LabelProps,
    Omit<ValidateMessageOldProps, "value"> {
  validateMessage: string
}
