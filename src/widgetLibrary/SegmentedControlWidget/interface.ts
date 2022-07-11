import { RadioGroupProps } from "@illa-design/radio"

export interface WrappedSegmentedControlProps
  extends Pick<
    RadioGroupProps<any>,
    "value" | "disabled" | "options" | "direction" | "colorScheme"
  > {
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
  handleUpdateGlobalData?: (key: string, value: any) => void
  displayName?: string
}
