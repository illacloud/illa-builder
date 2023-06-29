import { ReactNode } from "react"

export interface WrapperContainerProps {
  displayName: string
  parentNodeDisplayName: string
  widgetHeight: number
  widgetWidth: number
  widgetType: string
  widgetTop: number
  children: ReactNode
  columnNumber: number
}
