export interface CreateGlobalModalProps {
  onClose: () => void
  variableName?: string
  actionType: "ADD" | "UPDATE"
}
