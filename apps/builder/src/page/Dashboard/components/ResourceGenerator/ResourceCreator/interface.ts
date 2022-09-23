import { ResourceType } from "@/redux/resource/resourceState"
import { ResourceCreatorPage } from "@/page/Dashboard/components/ResourceGenerator/interface"

export interface ResourceCreatorProps {
  resourceId?: string
  resourceType: ResourceType
  onBack: (page: ResourceCreatorPage) => void
  onFinished: (resourceId: string) => void
}
