import { ReactNode } from "react"
import { ActionType } from "@/redux/currentApp/action/actionState"

export interface GeneralPanelLayoutProps {
  children: ReactNode
  mockEnabled?: boolean
  actionType?: ActionType
}
