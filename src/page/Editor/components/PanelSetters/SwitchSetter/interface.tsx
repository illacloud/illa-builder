import { BaseSetter } from "@/page/Editor/components/PanelSetters/interface"
import { PanelLabelProps } from "@/page/Editor/components/InspectPanel/interface"

export interface BaseSwitchProps extends BaseSetter {
  options?: any
}

type SwitchProProps = BaseSwitchProps & PanelLabelProps

export interface DynamicSwitchProps extends SwitchProProps {}
