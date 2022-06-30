import { DividerProps } from "@illa-design/divider"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedDividerProps
  extends Pick<TooltipWrapperProps, "tooltipText">,
    Pick<DividerProps, "text" | "textAlign"> {
  textSize?: string | number
  color?: DividerProps["colorScheme"]
}
