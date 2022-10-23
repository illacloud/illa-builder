import { DatePickerProps } from "@illa-design/date-picker"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedDateTimeProps
  extends Pick<
    DatePickerProps,
    "placeholder" | "disabled" | "readOnly" | "colorScheme"
  > {
  value?: string
  format?: string
  minuteStep?: number
  tooltipText?: string
  loading?: boolean
  showClear?: DatePickerProps["allowClear"]
  minDate?: string
  maxDate?: string
  handleUpdateDsl: (value: any) => void
}

export interface DateTimeWidgetProps
  extends WrappedDateTimeProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  validateMessage: string
}
