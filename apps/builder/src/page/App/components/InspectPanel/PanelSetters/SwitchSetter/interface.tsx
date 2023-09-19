import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/components/Label/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface BaseSwitchProps extends BaseSetter {
  value?: boolean
}

export interface DynamicSwitchProps extends BaseSetter, PanelLabelProps {
  panelConfig: Record<string, any>
  openDynamic?: boolean
  value?: string | boolean
  expectedType: VALIDATION_TYPES
}
