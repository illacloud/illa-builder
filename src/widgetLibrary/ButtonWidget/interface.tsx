import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { ButtonProps } from "@illa-design/button"

export type alignmentType = "start" | "center" | "end" | "fullWidth"

export interface WrappedButtonProps
  extends Pick<
    ButtonProps,
    | "variant"
    | "leftIcon"
    | "rightIcon"
    | "disabled"
    | "loading"
    | "borderColor"
    | "backgroundColor"
    | "textColor"
  > {
  text?: string
  submit?: boolean
  submitTargetId?: string
  alignment?: alignmentType
  borderRadius?: string
  handleOnClick: () => void
  colorScheme?: string
}

export interface ButtonWidgetProps extends WrappedButtonProps, BaseWidgetProps {
  handleOnclick: () => void
}
