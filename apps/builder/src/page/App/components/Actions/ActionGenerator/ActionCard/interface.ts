import { ActionType } from "@/redux/currentApp/action/actionState"

export interface ActionTypeSelectorCardProps {
  onSelect?: (item: ActionType) => void
  actionType: ActionType
}
