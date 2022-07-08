import { CheckboxGroupProps } from "@illa-design/checkbox"

export interface WrappedCheckboxGroupProps
  extends Pick<
    CheckboxGroupProps,
    "value" | "disabled" | "options" | "direction" | "colorScheme"
  > {
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
  handleUpdateGlobalData?: (key: string, value: any) => void
  displayName?: string
}
