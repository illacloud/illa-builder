import { ReactNode } from "react"
import { WidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionState"

export interface DragContainerProps {
  children: ReactNode
  displayName: string
  parentNodeDisplayName: string
  canDrag: boolean
  unitWidth: number
  columnNumber: number
}

export enum DRAG_EFFECT {
  ADD = "ADD",
  UPDATE = "UPDATE",
}

export interface DragInfo {
  draggedComponents: WidgetLayoutInfo[]
  dragEffect: DRAG_EFFECT
  draggedDisplayName: string
  alignTop?: boolean
  dropResult?: {
    x: number
    y: number
    w: number
    previewH: number
  }
  columnNumberWhenDragged: number
  unitWWhenDragged: number
}
