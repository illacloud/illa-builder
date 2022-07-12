import { CheckboxGroupProps } from "@illa-design/checkbox"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedCheckboxGroupProps
  extends Pick<
      CheckboxGroupProps,
      "value" | "disabled" | "options" | "direction" | "colorScheme"
    >,
    BaseWidgetProps {
  optionConfigureMode?: "dynamic" | "static"
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
