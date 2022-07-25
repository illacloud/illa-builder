import { HTMLAttributes } from "react"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export interface ActionPanelProps<T extends ActionContent>
  extends HTMLAttributes<HTMLDivElement> {
  action: ActionItem<T>
}
