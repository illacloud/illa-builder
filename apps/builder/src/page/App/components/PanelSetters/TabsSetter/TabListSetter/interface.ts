import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface ViewItemShape {
  id: string
  key: string
  label: string
  disabled?: string
  hidden?: string
}

export interface ViewSetterProps extends BaseSetter {
  value: ViewItemShape[]
  childrenSetter?: PanelFieldConfig[]
}

export interface DragIconAndLabelProps {
  index: number
}
