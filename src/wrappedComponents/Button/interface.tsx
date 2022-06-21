import { ButtonProps } from "@illa-design/button/src"

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
  > {
  text?: string
  submit?: boolean
  submitTargetId?: string
  alignment?: alignmentType
  tooltipText?: string
  borderRadius?: string
}
