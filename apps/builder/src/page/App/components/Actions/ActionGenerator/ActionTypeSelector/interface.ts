import { ResourceDataItem } from "../config"
import { ActionType } from "@/redux/currentApp/action/actionState"

export type ActionTypeCategory = "databases" | "apis" | "jsTransformer"

export interface ActionTypeSelectorProps {
  onSelect?: (item: ActionType) => void
  resourceOnly?: boolean
}

export interface ActionTypeSelectorCardProps extends ResourceDataItem {
  onSelect?: (item: ActionType) => void
  category: ActionTypeCategory
}
