import { ReactNode } from "react"
import { CommonRangeProps } from "@illa-design/date-picker"
import LabelProps from "@/wrappedComponents/Label/interface"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"

export interface WrappedDateRangeProps
  extends LabelProps,
    Omit<ValidateMessageProps, "value">,
    Pick<TooltipWrapperProps, "tooltipText">,
    Pick<CommonRangeProps, "disabled" | "colorScheme" | "readOnly"> {
  value?: string[]
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
  handleUpdateDsl?: (value: Record<string, string[]>) => void
}
