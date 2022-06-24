import { ActionType } from "../interface"

export type ConnectionRef = {
  testConnection: () => void
}

export interface ResourceFormEditorProps {
  actionType: ActionType
  resourceId?: string
  resourceType?: string
  ResourceFormEditor?: boolean
  withoutBack?: boolean
  back?: () => void
  onSubmit?: (resourceId: string) => void
}
