import { SectionViewShape } from "@illa-public/public-types"

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
  otherPaths: string[]
  index: number
  handleDeleteSectionView: (index: number) => void
  handleUpdateItem: (path: string, value: string) => void
  attrPath: string
  parentNodeDisplayName: string
}

export interface LabelNameAndDragIconProps {
  name: string
  isDuplicationKey: boolean
}

export interface ModalProps {
  onCloseModal: () => void
  path: string
  handleUpdateItem: (value: string) => void
}
