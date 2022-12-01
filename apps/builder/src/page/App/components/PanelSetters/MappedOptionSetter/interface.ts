import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface MappedOptionSetterProps extends BaseSetter, PanelLabelProps {
  childrenSetter?: PanelFieldConfig[]
}
