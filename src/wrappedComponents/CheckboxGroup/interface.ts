import LabelProps from "@/wrappedComponents/Label/interface"
import { CheckboxGroupProps } from "@illa-design/checkbox"

export interface WrappedCheckboxGroupProps
  extends Pick<
      CheckboxGroupProps,
      "value" | "disabled" | "options" | "direction" | "defaultValue"
    >,
    LabelProps {
  tooltipText?: string
  handleUpdateDsl: (value: Record<string, any>) => void
}
