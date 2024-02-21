import { RadioGroupProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PC/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedRadioGroupProps
  extends Pick<
    RadioGroupProps<any>,
    "value" | "disabled" | "options" | "direction" | "colorScheme"
  > {
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

export interface RadioGroupWidgetProps
  extends Omit<WrappedRadioGroupProps, "handleOnChange">,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
  optionConfigureMode?: "static" | "dynamic"
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
  w: number
  validateMessage: string
}
