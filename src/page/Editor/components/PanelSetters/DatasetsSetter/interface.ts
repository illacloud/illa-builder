import { BaseSetter } from "@/page/Editor/components/PanelSetters/interface"
import { aggregationMethodStyle } from "@/page/Editor/components/PanelSetters/DatasetsSetter/style"

export interface HeaderProps {
  labelName: string
}

export interface ActionsProps {
  handleUpdateItem: (index: number, value: any) => void
  handleCopyItem: (index: number) => void
  handleDeleteItem: (index: number) => void
}

export interface ListItemProps extends ActionsProps {
  id: string
  label: string
  value: any
  disabled?: string
  index: number
  color?: string
  aggregationMethod?: string
  moveItem: (dragIndex: number, hoverIndex: number) => void
  hidden?: boolean
}

export interface ModalProps
  extends Omit<
    ListItemProps,
    "id" | "moveItem" | "handleCopyItem" | "handleDeleteItem"
  > {
  title: string
  handleCloseModal: () => void
}

export interface OptionListSetterProps extends BaseSetter {}

export interface DragItem {
  index: number
  id: string
  type: string
}

export interface ActionMenuProps {
  index: number
  handleCopyItem: (index: number) => void
  handleCloseMode: () => void
  handleDeleteItem: (index: number) => void
}
