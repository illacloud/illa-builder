import { ResourceType } from "@/redux/resource/resourceState"
import { ResourceDataItem } from "../config"

export interface ResourceCardSelectorProps extends ResourceDataItem {
  onSelect?: (item: ResourceType) => void
}
