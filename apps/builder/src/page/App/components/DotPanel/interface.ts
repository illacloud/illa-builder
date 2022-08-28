import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { HTMLAttributes } from "react"

export interface DotPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentNode: ComponentNode
}

export interface DragPosition {
  squareX: number
  squareY: number
  renderX: number
  renderY: number
}

// return when drop trigger
export interface DropResultInfo {}

// return when drop collect trigger
export interface DropCollectedInfo {
  isActive: boolean
  nodeWidth: number
  nodeHeight: number
}

// return when drag collect trigger
export interface DragCollectedInfo {
  isDragging: boolean
}

export interface PreviewPlaceholderProps {
  canDrop: boolean
  x: number
  y: number
  w: number
  h: number
}
