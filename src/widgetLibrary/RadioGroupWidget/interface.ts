import { RadioGroupProps } from "@illa-design/radio"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedRadioGroupProps
  extends Pick<
      RadioGroupProps<any>,
      "value" | "disabled" | "options" | "direction" | "colorScheme"
    >,
    BaseWidgetProps {
  optionConfigureMode?: "static" | "dynamic"
  handleUpdateDsl: (value: Record<string, any>) => void
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
  handleOnChange?: (value: Record<string, any>) => void
}
