import { ActionCreatorPage } from "@/page/App/components/Actions/ActionGenerator/interface"
import { ResourceType } from "@/redux/resource/resourceState"

export interface ResourceEditorProps {
  resourceId?: string
  resourceType: ResourceType
  onBack: (page: ActionCreatorPage) => void
  onFinished: (resourceId: string) => void
}
