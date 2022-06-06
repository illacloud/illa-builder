export interface ResourceEditorProps {
  onChangeResource?: (resourceId: string) => void
  onCreateResource?: () => void
  onEditResource?: (resourceId: string) => void
  onChangeParam?: () => void
  onSaveParam?: () => void
  onRun?: (result: any) => void
}
