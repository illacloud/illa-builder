import { ResourceDataItem } from "../config"
import { ActionType } from "@/redux/currentApp/action/actionState"

export type ActionTypeCategory = "databases" | "apis" | "jsTransformer"

export interface ActionTypeSelectorProps {
  onSelect?: (item: ActionTypeInfo) => void
  resourceOnly?: boolean
  loading?: boolean
}

export interface ActionTypeSelectorCardProps extends ResourceDataItem {
  onSelect?: (item: ActionTypeInfo) => void
  category: ActionTypeCategory
}

export interface ActionTypeInfo {
  actionType: ActionType
  category?: ActionTypeCategory
}
