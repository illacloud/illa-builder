import { BaseSetter } from "@/page/Editor/components/PanelSetters/interface"

export interface HeaderProps {
  labelName: string
}

export interface ListItemProps {
  id: string
  label: string
  value: any
  disabled?: string
  index: number
  handleUpdateDsl: (index: number, value: any) => void
  moveItem: (dragIndex: number, hoverIndex: number) => void
}

export interface ModalProps
  extends Omit<ListItemProps, "setSelectedIndex" | "id" | "moveItem"> {
  title: string
}

export interface OptionListSetterProps extends BaseSetter {}

export interface DragItem {
  index: number
  id: string
  type: string
}
