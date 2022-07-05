import { InputNumberProps } from "@illa-design/input-number"

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
  handleUpdateDsl: (value: Record<string, number | undefined>) => void
  loading?: boolean
  colorScheme?: InputNumberProps["borderColor"]
}
