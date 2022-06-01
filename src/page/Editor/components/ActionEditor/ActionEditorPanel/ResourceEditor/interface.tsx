export interface ResourceEditorProps {
  onChangeResource?: (resourceId: string) => void
  onCreateResource?: () => void
  onEditResource?: () => void
  onChangeParam?: () => void
  onSaveParam?: () => void
}
