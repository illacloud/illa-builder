import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"

export interface HeaderProps {
  labelName: string
  handleAddOption: () => void
}

export interface CellItemProps {
  cellValue: string
  id: string
  label?: string
  index: number
}

export interface ColumnItemProps extends CellItemProps {}

export interface DragIconAndLabelProps extends CellItemProps {}

export interface ColumnListSetterProps extends BaseSetter {
  value: ColumnItemShape[]
  childrenSetter?: PanelFieldConfig[]
}

export interface CellSetterProps extends BaseSetter {
  value: CellItemProps[]
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
