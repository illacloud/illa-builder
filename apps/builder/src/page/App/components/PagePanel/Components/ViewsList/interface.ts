import { SectionViewShape } from "@/redux/currentApp/editor/components/componentsState"

export interface HeaderProps {
  sectionName: string
  sectionNodeExecutionResult: Record<string, any>
}

export interface ViewListProps {
  sectionName: string
}

export interface BodyProps {
  sectionNodeExecutionResult: Record<string, any>
}

export interface ItemProps extends Omit<SectionViewShape, "id" | "key"> {
  name: string
  otherKeys: string[]
  isSelected: boolean
  index: number
  handleChangSectionView: (index: number) => void
  handleDeleteSectionView: (index: number) => void
  handleUpdateItem: (path: string, value: string) => void
  attrPath: string
}

export interface LabelNameAndDragIconProps {
  name: string
  isDuplicationKey: boolean
  isSelected: boolean
  index: number
  handleChangSectionView: (index: number) => void
}

export interface ModalProps {
  onCloseModal: () => void
  name: string
  path: string
  handleUpdateItem: (path: string, value: string) => void
  attrPath: string
}
