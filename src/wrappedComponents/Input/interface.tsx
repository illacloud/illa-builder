import { ValidateMessageProps } from "../InvalidMessage/interface"
import LabelProps from "../Label/interface"
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
  onChange?: (value?: string) => void
  onSubmit?: () => void
  onFocus?: () => void
  onBlur?: () => void
}

export type WrappedInputRefType = {
  _inputRef: HTMLInputElement | null
  validate: () => void
  focus: () => void
}
