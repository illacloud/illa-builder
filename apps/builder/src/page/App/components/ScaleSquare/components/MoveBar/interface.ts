import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"

export interface MoveBarProps {
  displayName: string
  isError: boolean
  isMouseOver: boolean
  maxWidth: number
  selected: boolean
  widgetTop: number
  widgetType: string
  userList: CollaboratorsInfo[]
  columnNumber: number
}

export type BarPosition = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br"
