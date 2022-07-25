export interface ActionInfo {
  resourceId?: string
}

export interface ActionGeneratorProps {
  visible: boolean
  onClose: () => void
  onAddAction?: (info: ActionInfo) => void
}
