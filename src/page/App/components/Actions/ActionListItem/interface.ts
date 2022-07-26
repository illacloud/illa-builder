import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import { HTMLAttributes } from "react"

export interface ActionListItemProps extends HTMLAttributes<HTMLDivElement> {
  action: ActionItem<ActionContent>
  onItemClick: (action: ActionItem<ActionContent>) => void
}
