import { HTMLAttributes } from "react"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export interface ActionListItemProps extends HTMLAttributes<HTMLDivElement> {
  action: ActionItem<ActionContent>
  onItemClick: (action: ActionItem<ActionContent>) => void
  onCopyItem: (action: ActionItem<ActionContent>) => void
  onDeleteItem: (action: ActionItem<ActionContent>) => void
}
