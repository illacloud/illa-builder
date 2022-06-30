import { ButtonProps } from "@illa-design/button/src"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

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
    >,
    Pick<TooltipWrapperProps, "tooltipText"> {
  text?: string
  submit?: boolean
  submitTargetId?: string
  alignment?: alignmentType
  borderRadius?: string
  styles: {
    colorScheme: ButtonProps["colorScheme"]
  }
}
