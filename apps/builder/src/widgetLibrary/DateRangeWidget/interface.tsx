import { ReactNode } from "react"
import { CommonRangeProps } from "@illa-design/date-picker"
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
  showClear?: CommonRangeProps["allowClear"]
  beforeIcon?: ReactNode // TODO: not support yet
  afterIcon?: ReactNode // TODO: not support yet
  beforeText?: string // TODO: not support yet
  afterText?: string // TODO: not support yet
  minDate?: string
  maxDate?: string
  handleUpdateDsl: (value: any) => void
  displayName: string
  getValidateMessage: (value?: unknown) => string
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  handleOnChange?: () => void
}

export interface DateWidgetProps
  extends WrappedDateRangeProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {
  customRule?: string
  hideValidationMessage?: boolean
  validateMessage: string
}
