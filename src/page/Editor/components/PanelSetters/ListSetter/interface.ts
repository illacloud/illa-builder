import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/Editor/components/InspectPanel/interface"

export interface ListSetterProps extends PanelLabelProps {
  childrenSetter?: PanelFieldConfig[]
}
