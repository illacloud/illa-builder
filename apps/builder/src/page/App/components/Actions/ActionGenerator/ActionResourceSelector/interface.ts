import { ActionCreatorPage } from "@/page/App/components/Actions/ActionGenerator/interface"
import { ActionType } from "@/redux/currentApp/action/actionState"
import { ResourceType } from "@/redux/resource/resourceState"

export interface ActionResourceSelectorProps {
  actionType: ActionType
  onBack: (page: ActionCreatorPage) => void
  handleCreateAction: (
    resourceId: string,
    successCallback?: () => void,
    loadingCallback?: (loading: boolean) => void,
  ) => void
  onCreateResource: (resourceType: ResourceType) => void
  onCreateAction: (actionType: ActionType, resourceId?: string) => void
}
