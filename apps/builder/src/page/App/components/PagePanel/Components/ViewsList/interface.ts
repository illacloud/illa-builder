import { SectionViewShape } from "@/redux/currentApp/editor/components/componentsState"

export interface HeaderProps {
  sectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
    | "bodySection"
  parentNodeDisplayName: string
}

export interface ViewListProps {
  sectionName:
    | "leftSection"
    | "rightSection"
    | "headerSection"
    | "footerSection"
    | "bodySection"
}

export interface BodyProps {
  sectionName: string
  parentNodeDisplayName: string
  currentViewIndex: number
  viewSortedKey: string[]
  sectionViewConfigs: SectionViewShape[]
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
