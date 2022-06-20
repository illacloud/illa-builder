import { TriggerMode } from "@/page/App/components/ActionEditor/ActionEditorPanel/interface"

export interface ResourceEditorProps {
  triggerMode?: TriggerMode
  onChangeTriggerMode?: (mode: TriggerMode) => void
  onChangeResource?: (resourceId: string) => void
  onCreateResource?: () => void
  onEditResource?: (resourceId: string) => void
  onChangeParam?: () => void
  onSaveParam?: () => void
  onRun?: (result: any) => void
}
