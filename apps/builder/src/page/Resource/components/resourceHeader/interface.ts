import { ResourceType } from "@illa-public/public-types"

export interface ResourceHeaderProps {
  resourceType: ResourceType
  onClickBack: () => void
}
