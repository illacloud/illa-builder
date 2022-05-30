import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/Editor/components/InspectPanel/interface"
import { BaseSetter } from "@/page/Editor/components/PanelSetters/interface"

export interface ListSetterProps extends PanelLabelProps, BaseSetter {
  childrenSetter?: PanelFieldConfig[]
}
