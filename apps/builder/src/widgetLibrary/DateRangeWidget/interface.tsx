import { ReactNode } from "react"
import { RangeDatePickerProps } from "@illa-design/react"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedDateRangeProps
  extends Pick<RangeDatePickerProps, "disabled" | "colorScheme"> {
  readOnly?: RangeDatePickerProps["editable"]
  startValue: string
  endValue: string
  startPlaceholder?: string
  endPlaceholder?: string
  dateFormat?: string
  showClear?: RangeDatePickerProps["allowClear"]
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
  extends Omit<WrappedDateRangeProps, "handleOnChange">,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {
  customRule?: string
  hideValidationMessage?: boolean
  validateMessage: string
}
