import { RadioGroupProps } from "@illa-design/radio"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedRadioGroupProps
  extends Pick<
    RadioGroupProps<any>,
    "value" | "disabled" | "options" | "direction" | "colorScheme"
  > {
  handleUpdateDsl: (value: any) => void
  handleOnChange?: (value: Record<string, any>) => void
}

export interface RadioGroupWidgetProps
  extends WrappedRadioGroupProps,
    BaseWidgetProps {
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
}
