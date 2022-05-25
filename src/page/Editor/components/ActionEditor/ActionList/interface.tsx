import { HTMLAttributes } from "react"

export interface ActionListProps extends HTMLAttributes<HTMLDivElement> {
  activeActionItemId: string
  setActiveActionItemId: (id: string) => void
  isActionDirty: boolean
  setIsActionDirty: (dirty: boolean) => void
}

export interface SearchHeaderProps {
  updateAction: (action: string) => void
}
