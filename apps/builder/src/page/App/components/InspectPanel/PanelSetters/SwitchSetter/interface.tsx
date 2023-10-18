import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/components/Label/interface"

export interface BaseSwitchProps extends BaseSetter {
  value?: boolean
  labelName?: string
  detailedDescription?: string
  labelDesc?: string
  labelSize?: "medium" | "small"
}

export interface DynamicSwitchProps extends BaseSetter, PanelLabelProps {
  panelConfig: Record<string, any>
  openDynamic?: boolean
  value?: string | boolean
}
