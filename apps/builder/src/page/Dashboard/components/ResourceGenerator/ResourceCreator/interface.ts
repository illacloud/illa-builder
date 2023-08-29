import { ResourceCreatorPage } from "@/page/Dashboard/components/ResourceGenerator/interface"
import { ResourceType } from "@/redux/resource/resourceState"

export interface ResourceCreatorProps {
  resourceID?: string
  resourceType?: ResourceType
  onBack: (page: ResourceCreatorPage) => void
  onFinished: (resourceID: string) => void
}
