export interface ResourcePanelProps {
  resourceId?: string
  activeActionItemId?: string | null
  onChange?: () => void
  onSave?: () => void
}
