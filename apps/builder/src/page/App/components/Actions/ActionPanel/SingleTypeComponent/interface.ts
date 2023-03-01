import { SelectProps, SelectValue } from "@illa-design/react"
import { ControlledInputProps } from "@/page/App/components/InputEditor/interface"

export interface SingleComponentProps
  extends Pick<SelectProps, "options">,
    Omit<ControlledInputProps, "value"> {
  componentType: "select" | "checkbox" | "editor"
  title?: string
  onChange: (value: any) => void
  value: boolean | SelectValue
  checkoutTitle?: string
}
