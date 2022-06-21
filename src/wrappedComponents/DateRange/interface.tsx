import { ReactNode } from "react"
import { CommonRangeProps } from "@illa-design/date-picker"
import LabelProps from "@/wrappedComponents/Label/interface"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"

export interface WrappedDateRangeProps
  extends LabelProps,
  Omit<ValidateMessageProps, "value">,
  Pick<
  CommonRangeProps,
  "defaultValue" | "disabled" | "colorScheme" | "readOnly"
  > {
  value?: string[]
  startPlaceholder?: string
  endPlaceholder?: string
  dateFormat?: string
  tooltipText?: string
  loading?: boolean
  showClear?: boolean
  beforeIcon?: ReactNode
  afterIcon?: ReactNode
  beforeText?: string
  afterText?: string
  minDate?: string
  maxDate?: string
  handleUpdateDsl?: (value: Record<string, string[]>) => void
}
