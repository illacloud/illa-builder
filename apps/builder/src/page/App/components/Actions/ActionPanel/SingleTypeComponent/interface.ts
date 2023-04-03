import { ReactNode } from "react"
import { RadioGroupProps, SelectProps, SelectValue } from "@illa-design/react"

export type SingleComponentType =
  | "select"
  | "checkbox"
  | "switch"
  | "radio-group"

export interface SingleComponentProps
  extends Pick<SelectProps, "options" | "showSearch" | "loading" | "error">,
    Pick<RadioGroupProps<any>, "forceEqualWidth" | "type"> {
  componentType: SingleComponentType
  title?: string
  onChange?: (value: any) => void
  onSelectedValueChange?: (value: SelectValue) => void
  onBooleanValueChange?: (value: boolean) => void
  value: boolean | SelectValue
  checkoutTitle?: string
  switchContent?: string
  placeholder?: string
  tips?: ReactNode
  style?: Record<string, string | number>
  radioOptions?: RadioGroupProps<any>["options"]
}
