import { SingleDatePickerProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedDateTimeProps
  extends Pick<
    SingleDatePickerProps,
    "placeholder" | "disabled" | "colorScheme"
  > {
  readOnly?: SingleDatePickerProps["editable"]
  value?: string
  format?: string
  minuteStep?: number
  tooltipText?: string
  loading?: boolean
  showClear?: SingleDatePickerProps["allowClear"]
  minDate?: string
  maxDate?: string
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

export interface DateTimeWidgetProps
  extends Omit<WrappedDateTimeProps, "handleOnChange">,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  validateMessage: string
}
