import { ResourceType } from "@illa-public/public-types"
import { ResourceCreatorPage } from "@/page/App/components/Actions/ResourceGenerator/interface"

export interface ResourceCreatorProps {
  resourceID?: string
  resourceType?: ResourceType
  onBack: (page: ResourceCreatorPage) => void
  onFinished: (resourceID?: string) => void
}
