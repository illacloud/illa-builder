import { ReactNode } from "react"

export interface ResizingContainerProps {
  unitW: number
  displayName: string
  children: ReactNode
  parentNodeDisplayName: string
  widgetHeight: number
  widgetWidth: number
  widgetLeft: number
  widgetTop: number
}
