import { ReactNode } from "react"
import { DatePickerProps } from "@illa-design/date-picker"
import LabelProps from "@/wrappedComponents/Label/interface"
import { ValidateMessageProps } from "@/wrappedComponents/InvalidMessage/interface"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"

export type alignmentType = "start" | "center" | "end" | "fullWidth"

export interface WrappedDateProps
  extends LabelProps,
    ValidateMessageProps,
    Pick<TooltipWrapperProps, "tooltipText">,
    Pick<
      DatePickerProps,
      "value" | "readOnly" | "disabled" | "placeholder" | "colorScheme"
    > {
  value?: string
  dateFormat?: string
  loading?: boolean
  showClear?: DatePickerProps["allowClear"]
  beforeIcon?: ReactNode // TODO: not support yet
  Aftericon?: ReactNode // TODO: not support yet
  beforeText?: string // TODO: not support yet
  afterText?: string // TODO: not support yet
  minDate?: string
  maxDate?: string
  handleUpdateDsl?: (value: Record<string, string>) => void
}
