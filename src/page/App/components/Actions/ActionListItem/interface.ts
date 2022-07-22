import { ActionItem } from "@/redux/currentApp/action/actionState"
import { HTMLAttributes } from "react"

export interface ActionListItemProps extends HTMLAttributes<HTMLDivElement> {
  action: ActionItem
  onItemClick: (action: ActionItem) => void
}
