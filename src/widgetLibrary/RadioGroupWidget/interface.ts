import { RadioGroupProps } from "@illa-design/radio"

export interface WrappedRadioGroupProps
  extends Pick<
    RadioGroupProps<any>,
    "value" | "disabled" | "options" | "direction" | "colorScheme"
  > {
  itemMode?: "manual" | "mapped"
  handleUpdateDsl: (value: Record<string, any>) => void
}
