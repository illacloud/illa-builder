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
  > {
  openThousandSeparator?: boolean
  loading?: boolean
  colorScheme?: InputNumberProps["borderColor"]
  handleUpdateDsl: (value: any) => void
}

export interface NumberInputWidgetProps
  extends WrappedNumberInputProps,
    BaseWidgetProps {}
