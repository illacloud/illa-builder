import { ActionCreatorPage } from "@/page/App/components/Actions/ActionGenerator/interface"
import { ResourceType } from "@/redux/resource/resourceState"

export interface ResourceEditorProps {
  resourceID?: string
  resourceType: ResourceType
  onBack: (page: ActionCreatorPage) => void
  onFinished: (resourceID: string) => void
}
