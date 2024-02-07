import { ReactNode } from "react"
import { InputProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedEditableTextProps
  extends Pick<
    InputProps,
    "placeholder" | "disabled" | "readOnly" | "maxLength" | "minLength"
  > {
  showCharacterCount?: InputProps["showWordLimit"]
  value?: string
  className?: string
  prefixIcon?: ReactNode
  prefixText?: string
  suffixIcon?: ReactNode
  suffixText?: string
  tooltipText?: string
  handleUpdateDsl: (value: any) => void
  colorScheme?: InputProps["colorScheme"]
  allowClear?: InputProps["allowClear"]
  handleOnChange: (value: string) => void
  handleOnFocus?: () => void
  handleOnBlur?: () => void
}

export interface EditableTextWidgetProps
  extends Omit<
      WrappedEditableTextProps,
      "maxLength" | "handleOnChange" | "handleOnFocus" | "handleOnBlur"
    >,
    BaseWidgetProps,
    LabelProps,
    Omit<ValidateMessageOldProps, "value"> {
  validateMessage: string
  defaultValue?: string
}
