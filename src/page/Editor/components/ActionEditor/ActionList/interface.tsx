import { HTMLAttributes, MouseEvent } from "react"

export interface ActionListProps extends HTMLAttributes<HTMLDivElement> {
  onAddActionItem: (id: string) => void
  onDuplicateActionItem: (id: string) => void
  onDeleteActionItem: (id: string) => void
  onSelectActionItem: (id: string) => void
  isActionDirty: boolean
}

export interface SearchHeaderProps {
  updateAction: (action: string) => void
}

export interface ContextMenuProps {
  id?: string
  contextMenuEvent?: MouseEvent
  onDuplicate?: () => void
  onDelete?: () => void
}
