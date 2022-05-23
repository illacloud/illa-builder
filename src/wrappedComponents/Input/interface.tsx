import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import LabelProps from "@/wrappedComponents/Label/interface"
import { ReactNode } from "react"

export interface WrappedInputProps extends LabelProps, ValidateMessageProps {
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  showCharacterCount?: boolean
  value?: string
  defaultValue?: string
  prefixIcon?: ReactNode
  prefixText?: string
  suffixIcon?: ReactNode
  suffixText?: string
  tooltipText?: string
}
