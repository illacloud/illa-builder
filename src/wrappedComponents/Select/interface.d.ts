import { ReactNode } from "react"
import { OptionProps } from "@illa-design/select"
import LabelProps from "../Label/interface"

export interface SelectProps extends LabelProps {
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
  optionConfigureMode?: "dynamic" | "static"
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
  // style
}
