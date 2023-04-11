import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { StepsOptionsType } from "@/widgetLibrary/StepsWidget/interface"

export interface StepsListSetterProps extends BaseSetter {
  value: StepsOptionsType[]
  childrenSetter?: PanelFieldConfig[]
}
