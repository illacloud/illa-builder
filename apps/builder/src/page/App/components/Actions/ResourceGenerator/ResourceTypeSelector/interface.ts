import { ResourceType } from "@/redux/resource/resourceState"

export interface ResourceTypeSelectorProps {
  onSelect: (item: ResourceType) => void
}
