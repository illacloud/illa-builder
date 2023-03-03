import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface CarouselSettings {
  id: string
  label: string
  url: string
  alt?: string
  hidden?: boolean
  disabled?: boolean
}

export interface MappedCarouselData {
  labels: string[]
  urls: string[]
  alts?: string[]
  isHidden?: boolean[]
  disables?: boolean[]
  events?: Record<string, unknown>[]
}

export interface CarouselProps {
  handleOnClick: () => void
  data: CarouselSettings[]
  autoPlay?: boolean
  interval?: number
  radius?: string
  hidden?: boolean
  disabled?: boolean
  showArrows?: boolean
  showDots?: boolean
  draggable?: boolean
  onClickItem?: (index: number) => void
  onChange?: (index: number) => void
}

export interface CarouselWidgetProps
  extends CarouselProps,
    BaseWidgetProps,
    TooltipWrapperProps {
  configureMode?: "static" | "dynamic"
  dataSources?: Array<unknown>
  manualData?: CarouselSettings[]
  mappedData?: MappedCarouselData
  componentNode: ComponentNode
}
