import { InputNumberProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedNumberInputProps
  extends Pick<
    InputNumberProps,
    | "value"
    | "placeholder"
    | "max"
    | "min"
    | "precision"
    | "disabled"
    | "readOnly"
    | "prefix"
    | "suffix"
  > {
  openThousandSeparator?: boolean
  loading?: boolean
  colorScheme?: InputNumberProps["colorScheme"]
  displayName: string
  handleUpdateDsl: (value: any) => void
  getValidateMessage: (value?: unknown) => string
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  handleOnChange?: () => void
  handleOnBlur?: () => void
  handleOnFocus?: () => void
}

export interface NumberInputWidgetProps
  extends Omit<
      WrappedNumberInputProps,
      "handleOnChange" | "handleOnFocus" | "handleOnBlur"
    >,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    ValidateMessageOldProps {
  validateMessage: string
}
