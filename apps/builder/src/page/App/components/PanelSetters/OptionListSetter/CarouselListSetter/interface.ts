import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { CarouselSettings } from "@/widgetLibrary/CarouselWidget/interface"

export interface CarouselListSetterProps extends BaseSetter {
  value: CarouselSettings[]
  childrenSetter?: PanelFieldConfig[]
}
