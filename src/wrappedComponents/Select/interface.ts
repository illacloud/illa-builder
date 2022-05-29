import { ReactNode } from "react"
import LabelProps from "@/wrappedComponents/Label/interface"

export interface SelectProps {
  options?: (
    | string
    | number
    | {
        label: ReactNode | string
        value: string | number
        disabled?: boolean
        extra?: any
      }
  )[]
  value?: string | number
  placeholder?: string
  defaultValue?: string | number
  disabled?: boolean
  loading?: boolean
  readOnly?: boolean
  invalid?: boolean
  showClear?: boolean
  prefixIcon?: string
  suffixIcon?: string
  prefixText?: string
  suffixText?: string
  hideValidationMessage?: boolean
  required?: boolean
  showSearch?: boolean
  inputValue?: string
}

export interface WrappedSelectProps extends LabelProps, SelectProps {
  optionConfigureMode?: "dynamic" | "static"
  showClear?: boolean
  tooltipText?: string
  handleUpdateDsl: (value: Record<string, any>) => void
}
