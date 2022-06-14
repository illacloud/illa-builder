import LabelProps from "@/wrappedComponents/Label/interface"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import { ReactNode } from "react"
import { InputBorderColor } from "@illa-design/input"

export type alignmentType = "start" | "center" | "end" | "fullWidth"

export interface WrappedDateProps
  extends LabelProps,
    Omit<ValidateMessageProps, "value"> {
  value?: number
  defaultValue?: number
  tooltipText?: string
  disabled?: boolean
  loading?: boolean
  allowClear?: boolean
  required?: boolean
  readOnly?: boolean
  handleUpdateDsl?: (value: Record<string, string>) => void
  heart?: boolean
  allowHalf?: boolean
  maxCount?: number
}
