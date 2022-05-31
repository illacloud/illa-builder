import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import { ReactNode } from "react"
import LabelProps from "@/wrappedComponents/Label/interface"

export interface WrappedInputProps extends LabelProps, ValidateMessageProps {
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  showCharacterCount?: boolean
  showClear?: boolean
  value?: string
  tooltipText?: string
  defaultValue?: string
  prefixIcon?: ReactNode
  prefixText?: string
  suffixIcon?: ReactNode
  suffixText?: string
  tooltipText?: string
  handleUpdateDsl: (value: Record<string, string>) => void
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
