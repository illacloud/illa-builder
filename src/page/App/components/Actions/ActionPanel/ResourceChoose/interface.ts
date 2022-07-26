import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import {
  ActionContent,
  ActionItem,
  ActionTriggerMode,
} from "@/redux/currentApp/action/actionState"

export interface ResourceChooseProps {
  actionItem: ActionItem<ActionContent>
  onModeChange: (mode: ActionTriggerMode) => void
  onResourceChange: (resource: Resource<ResourceContent>) => void
}
