import { BaseSetter } from "@/page/App/components/PanelSetters/interface"

export interface OptionItemShape {
  id: string
  value?: string
  label?: string
  disabled?: string
}

export interface HeaderProps {
  labelName: string
  attrName: string
  optionItems: OptionItemShape[]
  handleUpdateDsl: (attrPath: string, value: OptionItemShape[]) => void
}

export interface OptionListBodyProps {
  optionItems: OptionItemShape[]
  handleUpdateDsl: (attrPath: string, value: OptionItemShape[]) => void
  attrName: string
}

export interface ListItemProps extends ActionsProps, OptionItemShape {
  id: string
  index: number
  moveItem: (dragIndex: number, hoverIndex: number) => void
}

export interface DragIconAndLabelProps
  extends OptionItemShape,
    Pick<ActionsProps, "handleUpdateItem"> {
  index: number
}

export interface MoreProps extends Omit<ActionsProps, "handleUpdateItem"> {
  index: number
}

export interface ActionsProps {
  handleUpdateItem: (index: number, value: any) => void
  handleCopyItem: (index: number) => void
  handleDeleteItem: (index: number) => void
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

export enum ActionType {
  DUPLICATE = "DUPLICATE",
  DELETE = "DELETE",
}
