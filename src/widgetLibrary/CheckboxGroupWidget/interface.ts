import { CheckboxGroupProps } from "@illa-design/checkbox"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedCheckboxGroupProps
  extends Pick<
    CheckboxGroupProps,
    "value" | "disabled" | "options" | "direction" | "colorScheme"
  > {
  handleUpdateDsl: (value: any) => void
  handleOnChange?: (value: Record<string, any>) => void
}

export interface CheckboxGroupWidgetProps
  extends WrappedCheckboxGroupProps,
    BaseWidgetProps {
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
}
