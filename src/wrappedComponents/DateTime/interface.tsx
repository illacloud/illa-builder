import { DatePickerProps } from "@illa-design/date-picker"
import LabelProps from "@/wrappedComponents/Label/interface"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"

export interface WrappedDateTimeProps
  extends LabelProps,
    ValidateMessageProps,
    Pick<TooltipWrapperProps, "tooltipText">,
    Pick<
      DatePickerProps,
      "placeholder" | "disabled" | "readOnly" | "colorScheme"
    > {
  value?: string
  dateFormat?: string
  timeFormat?: string
  minuteStep?: number
  tooltipText?: string
  loading?: boolean
  showClear?: DatePickerProps["allowClear"]
  minDate?: string
  maxDate?: string
  handleUpdateDsl?: (value: Record<string, string>) => void
}
