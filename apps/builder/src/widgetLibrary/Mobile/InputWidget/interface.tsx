import { InputProps } from "antd-mobile"
import { ValidateMessageOldProps } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedInputProps
  extends Pick<InputProps, "placeholder" | "disabled" | "readOnly">,
    BaseWidgetProps {
  type?: "input" | "password" | "search"
  showVisibleButton?: boolean
  value?: string
  allowClear?: InputProps["clearable"]
  handleOnChange?: (value: string) => void
  handleOnFocus?: () => void
  handleOnBlur?: () => void
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  getValidateMessage: (value: string) => string
  clearValue: () => void
  maxLength?: number
  minLength?: number
}

export interface InputWidgetProps
  extends Omit<
      WrappedInputProps,
      "maxLength" | "handleOnChange" | "handleOnFocus" | "handleOnBlur"
    >,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  defaultValue: string
  validateMessage: string
}
