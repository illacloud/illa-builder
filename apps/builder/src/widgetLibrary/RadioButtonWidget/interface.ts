import { RadioGroupProps } from "@illa-design/radio"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"

export interface WrappedRadioButtonProps
  extends Pick<
    RadioGroupProps<any>,
    "value" | "disabled" | "options" | "direction" | "colorScheme"
  > {
  handleUpdateDsl: (value: any) => void
}

export interface RadioButtonWidgetProps
  extends WrappedRadioButtonProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps,
    Omit<ValidateMessageOldProps, "value"> {
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
