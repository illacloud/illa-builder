import { ActionType } from "../interface"

export type ConnectionRef = {
  testConnection: () => void
}

export interface ResourceFormEditorProps {
  actionType: ActionType
  resourceId?: string
  resourceType?: string
  back?: () => void
  onSubmit?: (resourceId: string) => void
}
