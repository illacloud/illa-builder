import { ActionType } from "@illa-public/public-types"
import { ReactNode } from "react"

export interface GeneralPanelLayoutProps {
  children: ReactNode
  mockEnabled?: boolean
  actionType?: ActionType
}
