import { ButtonProps } from "antd-mobile"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedButtonProps
  extends Pick<ButtonProps, "fill" | "disabled" | "loading"> {
  text?: string
  handleOnClick: () => void
  colorScheme?: string
}

export interface ButtonWidgetProps
  extends WrappedButtonProps,
    BaseWidgetProps,
    TooltipWrapperProps {}
