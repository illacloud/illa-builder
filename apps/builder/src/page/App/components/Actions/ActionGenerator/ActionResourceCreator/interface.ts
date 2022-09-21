import { ResourceType } from "@/redux/resource/resourceState"
import { ActionCreatorPage } from "@/page/App/components/Actions/ActionGenerator/interface"

export interface ResourceEditorProps {
  resourceId?: string
  resourceType: ResourceType
  onBack: (page: ActionCreatorPage) => void
  onCreated: (resourceId: string) => void
}
