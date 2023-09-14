import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { CarouselSettings } from "@/widgetLibrary/CarouselWidget/interface"

export interface CarouselListSetterProps extends BaseSetter {
  value: CarouselSettings[]
  childrenSetter?: PanelFieldConfig[]
}
