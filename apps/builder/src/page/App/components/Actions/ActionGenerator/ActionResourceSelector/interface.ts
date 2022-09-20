import { ResourceType } from "@/redux/resource/resourceState"
import { ActionType } from "@/redux/currentApp/action/actionState"

export interface ActionResourceSelectorProps {
  actionType: ActionType
  onBack: () => void
  onCreateResource: (resourceType: ResourceType) => void
  onCreateAction: (actionType: ActionType, resourceId?: string) => void
}
