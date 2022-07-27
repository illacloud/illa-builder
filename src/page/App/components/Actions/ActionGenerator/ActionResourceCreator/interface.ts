import { ActionType } from "@/redux/currentApp/action/actionState"

export type ConnectionRef = {
  testConnection: () => void
}

export interface ActionResourceCreatorProps {
  resourceId?: string
  resourceType?: ActionType
  ResourceFormEditor?: boolean
  onBack?: () => void
  onSubmit?: (resourceId: string) => void
}
