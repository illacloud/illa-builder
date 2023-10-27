import { ResourceType } from "@illa-public/public-types"
import { ActionCreatorPage } from "@/page/App/components/Actions/ActionGenerator/interface"
import { ActionType } from "@/redux/currentApp/action/actionState"

export interface ActionResourceSelectorProps {
  actionType: ActionType
  canBack?: boolean
  onBack: (page: ActionCreatorPage) => void
  handleCreateAction: (
    resourceID: string,
    successCallback?: () => void,
    loadingCallback?: (loading: boolean) => void,
  ) => void
  onCreateResource: (resourceType: ResourceType) => void
  onCreateAction: (actionType: ActionType, resourceID?: string) => void
}
