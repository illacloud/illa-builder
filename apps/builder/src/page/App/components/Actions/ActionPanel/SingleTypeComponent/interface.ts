import { SelectProps, SelectValue } from "@illa-design/react"

export interface SingleComponentProps extends Pick<SelectProps, "options"> {
  componentType: "select" | "checkbox" | "editor"
  title?: string
  onChange: (value: boolean | SelectValue) => void
  value: boolean | SelectValue
  checkoutTitle?: string
}
