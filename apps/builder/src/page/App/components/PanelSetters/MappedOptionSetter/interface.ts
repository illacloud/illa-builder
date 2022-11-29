import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/App/components/InspectPanel/interface"

export interface MappedOptionSetterProps extends BaseSetter, PanelLabelProps {
  childrenSetter?: PanelFieldConfig[]
}
