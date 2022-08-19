import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { ButtonProps } from "@illa-design/button"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

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
  borderRadius?: string
  handleOnClick: () => void
  colorScheme?: string
}

export interface ButtonWidgetProps
  extends WrappedButtonProps,
    BaseWidgetProps,
    TooltipWrapperProps {
  handleOnclick: () => void
}
