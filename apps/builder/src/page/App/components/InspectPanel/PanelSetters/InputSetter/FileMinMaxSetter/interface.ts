import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelLabelProps } from "@/page/App/components/InspectPanel/components/Label/interface"

export interface FileMinMaxSetterProps extends BaseSetter, PanelLabelProps {
  placeholder?: string
}
