import { ReactNode } from "react"
import { CommonRangeProps } from "@illa-design/date-picker"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedDateRangeProps
  extends Pick<CommonRangeProps, "disabled" | "readOnly" | "colorScheme"> {
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
  handleUpdateDsl: (value: any) => void
}

export interface DateWidgetProps
  extends WrappedDateRangeProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {}
