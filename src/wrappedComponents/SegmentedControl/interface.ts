import LabelProps from "@/wrappedComponents/Label/interface"
import { RadioGroupProps } from "@illa-design/radio"

export interface WrappedSegmentedControlProps
  extends Pick<
      RadioGroupProps<any>,
      | "value"
      | "defaultValue"
      | "disabled"
      | "options"
      | "direction"
      | "colorScheme"
    >,
    LabelProps {
  tooltipText?: string
  handleUpdateDsl: (value: Record<string, any>) => void
}
