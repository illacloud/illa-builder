import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/components/Label/interface"

export interface ColumnSwitchSetterProps extends BaseSetter, PanelLabelProps {
  panelConfig: Record<string, any>
  openDynamic?: boolean
  value?: string | boolean
}
