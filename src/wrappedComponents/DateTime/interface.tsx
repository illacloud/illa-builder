import LabelProps from "@/wrappedComponents/Label/interface"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import { InputBorderColor } from "@illa-design/input"

export type alignmentType = "start" | "center" | "end" | "fullWidth"

export interface WrappedDateTimeProps extends LabelProps, ValidateMessageProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  dateFormat?: string
  timeFormat?: string
  minuteStep?: number
  tooltipText?: string
  disabled?: boolean
  loading?: boolean
  readOnly?: boolean
  showClear?: boolean
  required?: boolean
  colorScheme?: InputBorderColor
  minDate?: string
  maxDate?: string
  handleUpdateDsl?: (value: Record<string, string>) => void
}
