import {
  RangeDatePickerProps,
  RangePickerProps,
  TimePickerValue,
} from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedTimeRangeProps
  extends Pick<RangePickerProps, "disabled" | "colorScheme" | "format"> {
  startTime: TimePickerValue
  endTime: TimePickerValue
  startPlaceholder?: string
  endPlaceholder?: string
  minuteStep?: number
  showClear?: RangeDatePickerProps["allowClear"]
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

export interface TimeRangeWidgetProps
  extends Omit<WrappedTimeRangeProps, "handleOnChange">,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  validateMessage: string
}
