import { ReactNode } from "react"
import { CommonRangeProps } from "@illa-design/date-picker"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

export interface WrappedDateRangeProps
  extends Omit<ValidateMessageProps, "value">,
    Pick<CommonRangeProps, "disabled" | "readOnly" | "colorScheme"> {
  startValue: string
  endValue: string
  startPlaceholder?: string
  endPlaceholder?: string
  dateFormat?: string
  loading?: boolean
  showClear?: CommonRangeProps["allowClear"]
  beforeIcon?: ReactNode // TODO: not support yet
  afterIcon?: ReactNode // TODO: not support yet
  beforeText?: string // TODO: not support yet
  afterText?: string // TODO: not support yet
  minDate?: string
  maxDate?: string
  handleUpdateDsl: (value: Record<string, string[]>) => void
}
