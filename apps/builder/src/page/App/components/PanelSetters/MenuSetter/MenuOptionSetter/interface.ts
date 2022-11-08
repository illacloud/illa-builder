import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import {
  PanelFieldConfig,
  PanelLabelProps,
} from "@/page/App/components/InspectPanel/interface"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import { ColumnsSelectSetter } from "@/page/App/components/PanelSetters/TableSetter/columsSelectSetter"
import { MenuList, SubMenu } from "@/widgetLibrary/MenuWidget/interface"

export interface HeaderProps {
  labelName: string
  handleAddOption: () => void
}

export interface ColumnItemProps extends MenuList {
  index: number
}

export interface DragIconAndLabelProps extends SubMenu {
  index: number
}

export interface ColumnListSetterProps extends BaseSetter {
  value: MenuList[]
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
