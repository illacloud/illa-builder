import { SelectProps, SelectValue } from "@illa-design/react"

export type SingleComponentType = "select" | "checkbox" | "switch"
export interface SingleComponentProps extends Pick<SelectProps, "options"> {
  componentType: SingleComponentType
  title?: string
  onChange?: (value: boolean | SelectValue) => void
  onSelectedValueChange?: (value: SelectValue) => void
  onBooleanValueChange?: (value: boolean) => void
  value: boolean | SelectValue
  checkoutTitle?: string
  placeholder?: string
}
