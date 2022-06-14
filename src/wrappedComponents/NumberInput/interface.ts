import { InputNumberProps } from "@illa-design/input-number"
import LabelProps from "@/wrappedComponents/Label/interface"

export interface WrappedNumberInputProps
  extends Pick<
      InputNumberProps,
      | "value"
      | "placeholder"
      | "max"
      | "min"
      | "precision"
      | "disabled"
      | "readOnly"
      | "prefix"
      | "suffix"
    >,
    LabelProps {
  openThousandSeparator?: boolean
  handleUpdateDsl: (value: Record<string, number | undefined>) => void
  loading?: boolean
  tooltipText?: string
}
