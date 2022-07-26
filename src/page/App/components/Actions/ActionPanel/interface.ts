import { HTMLAttributes } from "react"
import { ActionContent } from "@/redux/currentApp/action/actionState"

export interface ActionPanelProps<T extends ActionContent>
  extends HTMLAttributes<HTMLDivElement> {}
