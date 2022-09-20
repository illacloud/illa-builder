import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"

export interface ColumnItemShape {
  value?: string
  label?: string
  disabled?: string
  header: string
  accessorKey: string
}

export interface HeaderProps {
  labelName: string
  handleAddOption: () => void
}

export interface ColumnItemProps extends Omit<ColumnItemShape, "disabled"> {
  index: number
}

export interface DragIconAndLabelProps {
  index: number
}

export interface MoreProps {
  index: number
}

export interface ColumnListSetterProps extends BaseSetter {
  value: ColumnItemShape[]
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
