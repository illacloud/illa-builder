import { InputNumberProps } from "@illa-design/input-number"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

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
    BaseWidgetProps {
  openThousandSeparator?: boolean
  loading?: boolean
  colorScheme?: InputNumberProps["borderColor"]
}
