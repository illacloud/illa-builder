import { ActionCreatorPage } from "@/page/App/components/Actions/ActionGenerator/interface"
import { Agent } from "@/redux/aiAgent/aiAgentState"
import { ActionType } from "@/redux/currentApp/action/actionState"

export interface ActionResourceSelectorProps {
  actionType: ActionType
  onBack: (page: ActionCreatorPage) => void
  handleCreateAction: (
    item: Agent,
    successCallback?: () => void,
    loadingCallback?: (loading: boolean) => void,
  ) => void
  onCreateAction: () => void
}
