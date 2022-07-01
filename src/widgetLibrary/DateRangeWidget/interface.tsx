import { ReactNode } from "react"
import {
  CommonRangeProps,
  DatePickerCalendarValue,
} from "@illa-design/date-picker"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedDateRangeProps
  extends LabelProps,
    Omit<ValidateMessageProps, "value">,
    Pick<TooltipWrapperProps, "tooltipText">,
    Pick<CommonRangeProps, "disabled" | "readOnly"> {
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
  styles?: {
    colorScheme?: CommonRangeProps["colorScheme"]
  }
  handleUpdateDsl: (value: Record<string, string[]>) => void
}
