import { ResourceDataItem } from "@/page/App/components/ActionEditor/Resource"

export interface ActionTypeSelectorProps {
  onSelect?: () => void
}

export interface ActionTypeSelectorListProps {
  title: string
  list: ResourceDataItem[]
}

export interface ActionTypeSelectorCardProps extends ResourceDataItem { }
