import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export interface DragInfo {
  item: ComponentNode
  draggedSelectedComponents: ComponentNode[]
}

// return when drop trigger
export interface DropResultInfo {
  isDropOnCanvas: boolean
}

// return when drop collect trigger
export interface DropCollectedInfo {
  isActive: boolean
}

// return when drag collect trigger
export interface DragCollectedInfo {
  isDragging: boolean
}

export interface PreviewPlaceholderProps {
  canDrop: boolean
  x: number
  y: number
  lunchX: number
  lunchY: number
  w: number
  h: number
}
