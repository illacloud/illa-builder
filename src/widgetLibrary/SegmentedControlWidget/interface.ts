import { RadioGroupProps } from "@illa-design/radio"

export interface WrappedSegmentedControlProps
  extends Pick<
    RadioGroupProps<any>,
    "value" | "disabled" | "options" | "direction" | "colorScheme"
  > {
  handleUpdateDsl: (value: Record<string, any>) => void
}
