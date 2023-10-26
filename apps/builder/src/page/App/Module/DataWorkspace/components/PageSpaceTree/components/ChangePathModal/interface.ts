export interface ModalProps {
  onCloseModal: () => void
  path: string
  handleUpdateItem: (value: string) => void
  isParentPage: boolean
}
