import { ReactNode } from "react"

export interface ResizingAndDragContainerProps {
  unitW: number
  displayName: string
  children: ReactNode
  parentNodeDisplayName: string
  widgetHeight: number
  widgetWidth: number
  widgetLeft: number
  widgetTop: number
  widgetType: string
  columnNumber: number
}
