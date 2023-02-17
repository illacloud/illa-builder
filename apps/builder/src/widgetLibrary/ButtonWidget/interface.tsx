import { ButtonProps } from "@illa-design/react"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

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
  > {
  text?: string
  handleOnClick: () => void
  colorScheme?: string
}

export interface ButtonWidgetProps
  extends WrappedButtonProps,
    BaseWidgetProps,
    TooltipWrapperProps {}
