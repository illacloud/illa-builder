import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/App/components/InspectPanel/interface"
import { ColumnsSelectSetter } from "@/page/App/components/PanelSetters/TableSetter/columsSelectSetter"
import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"

export interface HeaderProps {
  labelName: string
  handleAddOption: () => void
}

export interface ColumnItemProps
  extends Omit<ColumnItemShape, "disabled" | "cell"> {
  index: number
}

export interface DragIconAndLabelProps {
  index: number
  label?: string
  visible?: boolean
  custom?: boolean
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
