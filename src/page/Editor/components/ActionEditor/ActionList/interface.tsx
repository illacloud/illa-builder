import { HTMLAttributes } from "react"

export interface ActionListProps extends HTMLAttributes<HTMLDivElement> {}

export interface ActionItem {
  id: string
  type: string
  name: string
  isWarning: boolean
  isUpdated: boolean
  time: string
}

export interface SearchHeaderProps {
  updateAction: (action: string) => void
}
