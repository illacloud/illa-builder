import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { ComponentNode } from "@/redux/currentApp/components/componentsState"

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
  componentNode: ComponentNode
}

export interface DragIconAndLabelProps {
  index: number
  label?: string
  isSelected: boolean
}
