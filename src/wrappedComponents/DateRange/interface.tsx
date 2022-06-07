import LabelProps from "@/wrappedComponents/Label/interface"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import { ReactNode } from "react"
import { InputBorderColor } from "@illa-design/input"

export type alignmentType = "start" | "center" | "end" | "fullWidth"

export interface WrappedDateRangeProps
  extends LabelProps,
    Omit<ValidateMessageProps, "value"> {
  value?: string[]
  defaultValue?: string
  startPlaceholder?: string
  endPlaceholder?: string
  dateFormat?: string
  tooltipText?: string
  disabled?: boolean
  loading?: boolean
  readOnly?: boolean
  showClear?: boolean
  beforeIcon?: ReactNode
  afterIcon?: ReactNode
  beforeText?: string
  afterText?: string
  required?: boolean
  colorScheme?: InputBorderColor
  minDate?: string
  maxDate?: string
  handleUpdateDsl?: (value: Record<string, string>) => void
}
