import { HTMLAttributes } from "react"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export interface ActionPanelProps extends HTMLAttributes<HTMLDivElement> {
  action: ActionItem
}
