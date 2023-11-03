import { DUPLICATION_HANDLER } from "@illa-public/public-types"

export interface SameNameModalProps {
  sameModalVisible: boolean
  setSameModalVisible: (open: boolean) => void
  objectName: string
  createFolder: (
    objectName: string,
    duplicationHandler: DUPLICATION_HANDLER,
  ) => Promise<void>
}

export interface SameNameModalContentProps {
  objectName: string
  createFolder: (
    objectName: string,
    duplicationHandler: DUPLICATION_HANDLER,
  ) => Promise<void>
  onCancel: () => void
}
