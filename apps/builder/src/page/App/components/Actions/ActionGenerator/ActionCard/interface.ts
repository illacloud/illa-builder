import { ActionType } from "@illa-public/public-types"

export interface ActionTypeSelectorCardProps {
  onSelect?: (item: ActionType) => void
  actionType: ActionType
}
