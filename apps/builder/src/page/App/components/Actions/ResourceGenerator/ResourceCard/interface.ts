import { ResourceType } from "@illa-public/public-types"
import { ResourceDataItem } from "../config"

export interface ResourceCardSelectorProps extends ResourceDataItem {
  onSelect?: (item: ResourceType) => void
}
