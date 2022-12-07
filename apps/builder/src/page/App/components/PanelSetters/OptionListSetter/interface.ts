import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface OptionItemShape {
  id: string
  value?: string
  label?: string
  disabled?: string
}

export interface HeaderProps {
  labelName: string
  handleAddOption: () => void
}

export interface ListItemProps extends Omit<OptionItemShape, "disabled"> {
  index: number
}

export interface DragIconAndLabelProps {
  index: number
  label?: string
}

export interface MoreProps {
  index: number
}

export interface OptionListSetterProps extends BaseSetter {
  value: OptionItemShape[]
  childrenSetter?: PanelFieldConfig[]
}

export interface DragItem {
  index: number
  id: string
  type: string
}

export interface ActionMenuProps {
  index: number
  handleCloseMode: () => void
}
