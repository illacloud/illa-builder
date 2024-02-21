import { CheckboxGroupProps } from "antd-mobile"
import { ValidateMessageOldProps } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedCheckboxGroupProps
  extends Pick<CheckboxGroupProps, "value" | "disabled"> {
  direction?: "horizontal" | "vertical"
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
  options: {
    label: string | number
    value: string | number
    disabled?: boolean
  }[]
}

export interface CheckboxGroupWidgetProps
  extends Omit<WrappedCheckboxGroupProps, "handleOnChange">,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    ValidateMessageOldProps {
  optionConfigureMode?: "dynamic" | "static"
  manualOptions?: {
    label: string
    value: string | number
    disabled?: boolean
    extra?: any
  }[]
  mappedOption?: {
    labels: string[]
    values: any[]
    disables: boolean[]
  }
  validateMessage: string
}
