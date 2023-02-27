import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface CarouselProps {
  text?: string
  handleOnClick: () => void
  colorScheme?: string
}

export interface CarouselWidgetProps
  extends CarouselProps,
    BaseWidgetProps,
    TooltipWrapperProps {}
