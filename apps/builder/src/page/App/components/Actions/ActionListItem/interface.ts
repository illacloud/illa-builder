import {
  ActionContent,
  ActionEvents,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { HTMLAttributes } from "react"

export interface ActionListItemProps extends HTMLAttributes<HTMLDivElement> {
  action: ActionItem<ActionContent, ActionEvents>
  onItemClick: (action: ActionItem<ActionContent, ActionEvents>) => void
  onCopyItem: (action: ActionItem<ActionContent, ActionEvents>) => void
  onDeleteItem: (action: ActionItem<ActionContent, ActionEvents>) => void
}
