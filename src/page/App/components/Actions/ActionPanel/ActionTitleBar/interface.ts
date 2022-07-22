import { HTMLAttributes } from "react"
import { ActionItem } from "@/redux/currentApp/action/actionState"

export interface ActionTitleBarProps extends HTMLAttributes<HTMLDivElement> {
  action: ActionItem
}
