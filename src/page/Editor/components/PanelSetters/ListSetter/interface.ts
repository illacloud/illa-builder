import { BaseSetterProps } from "../interface"
import { PanelFieldConfig } from "@/page/Editor/components/InspectPanel/interface"

export interface ListSetterProps extends BaseSetterProps {
  childrenSetter?: PanelFieldConfig[]
}
