export interface ResourcePanelProps {
  resourceId?: string
  onChange?: () => void
  onSave?: () => void
  onRun?: (result: any) => void
}
