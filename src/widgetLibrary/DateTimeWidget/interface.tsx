import { DatePickerProps } from "@illa-design/date-picker"
import { ValidateMessageProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedDateTimeProps
  extends ValidateMessageProps,
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
  handleUpdateDsl: (value: any) => void
}

export interface DateTimeWidgetProps
  extends WrappedDateTimeProps,
    BaseWidgetProps {}
