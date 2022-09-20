import { ResourceDataItem } from "@/page/App/components/Actions/ActionGenerator/config"
import { ActionType } from "@/redux/currentApp/action/actionState"

export type ActionTypeCategory = "databases" | "apis" | "jsTransformer"

export interface ActionTypeSelectorCardProps extends ResourceDataItem {
  onSelect?: (item: ActionType) => void
  category: ActionTypeCategory
}
