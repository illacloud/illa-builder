import {
  ResourceDataItem,
  ActionTypeCategory,
  ActionType,
} from "@/page/App/components/ActionEditor/Resource"

export interface ActionTypeSelectorProps {
  onSelect?: (item: ActionTypeInfo) => void
}

export interface ActionTypeSelectorListProps {
  title: string
  category: ActionTypeCategory
  list: ResourceDataItem[]
  onSelect?: (item: ActionTypeInfo) => void
}

export interface ActionTypeSelectorCardProps extends ResourceDataItem {
  onSelect?: (item: ActionTypeInfo) => void
  category: ActionTypeCategory
}

export interface ActionTypeInfo {
  type: ActionType
  category: ActionTypeCategory
}
