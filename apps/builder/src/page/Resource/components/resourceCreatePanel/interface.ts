import { ResourceType } from "@illa-public/public-types"

export interface ResourceCreatePanelProps {
  resourceType: ResourceType
  resourceID?: string
  handleOnFinished: () => void
  handleOnClickBack: () => void
}
