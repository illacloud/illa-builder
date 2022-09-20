import { ResourceType } from "@/redux/resource/resourceState"

export type ConnectionRef = {
  testConnection: () => void
}

export interface ActionResourceCreatorProps {
  resourceId?: string
  resourceType?: ResourceType
  onBack?: () => void
  onCreated?: (resourceId: string) => void
}
