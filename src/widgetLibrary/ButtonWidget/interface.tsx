import { ButtonProps } from "@illa-design/button/src"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

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
      | "colorScheme"
    >,
    BaseWidgetProps {
  text?: string
  submit?: boolean
  submitTargetId?: string
  alignment?: alignmentType
  borderRadius?: string
  handleOnClick: () => void
}
