import { HTMLAttributes } from "react"

export interface ActionListProps extends HTMLAttributes<HTMLDivElement> {
  activeActionItemId: string
  onAddActionItem: (id: string) => void
  onDuplicateActionItem: (id: string) => void
  onDeleteActionItem: (id: string) => void
  onSelectActionItem: (id: string) => void
  isActionDirty: boolean
}

export interface SearchHeaderProps {
  updateAction: (action: string) => void
}
