import { BaseSetter } from "@/page/App/components/PanelSetters/interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { DatasetConfig } from "@/widgetLibrary/Chart/interface"

export interface HeaderProps {
  labelName: string
  handleAddItem: () => void
}

export interface ActionsProps {
  handleUpdateItem: (index: number, value: any) => void
  handleCopyItem: (index: number) => void
  handleDeleteItem: (index: number) => void
}

export interface ListItemProps extends DatasetConfig {
  index: number
}

export interface ModalProps {
  value: DatasetConfig[]
  childrenSetter?: PanelFieldConfig[]
}

export interface DatasetSetterProps extends BaseSetter {
  value: DatasetConfig[]
  childrenSetter?: PanelFieldConfig[]
}

export interface ColorListSetter extends BaseSetter {
  options: any
}

export interface ActionMenuProps {
  index: number
  handleCopyItem: (index: number) => void
  handleCloseMode: () => void
  handleDeleteItem: (index: number) => void
}
