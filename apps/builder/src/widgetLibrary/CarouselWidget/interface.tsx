import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface CarouselProps {
  handleOnClick: () => void
  dataSources?: Array<unknown>

  autoPlay?: boolean
  interval?: number
  radius?: string
  hidden?: boolean
  disabled?: boolean
  showArrows?: boolean
  showDots?: boolean
}

export interface CarouselWidgetProps
  extends CarouselProps,
    BaseWidgetProps,
    TooltipWrapperProps {}
