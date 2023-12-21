export interface ChangeLog {
  content: string
  title: string
  changeLogLink: string
}

export interface ChangeLogModalProps {
  onClose: () => void
}
