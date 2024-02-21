import { SingleDatePickerProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedDateProps
  extends Pick<
    SingleDatePickerProps,
    "value" | "disabled" | "placeholder" | "colorScheme"
  > {
  readOnly?: SingleDatePickerProps["editable"]
  dateFormat?: string
  loading?: boolean
  showClear?: SingleDatePickerProps["allowClear"]
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
  extends Omit<WrappedDateProps, "handleOnChange">,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  validateMessage: string
}
