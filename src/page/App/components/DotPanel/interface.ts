import { HTMLAttributes } from "react"

export interface DotPanelProps extends HTMLAttributes<HTMLDivElement> {
  scale?: number
}

// return when drop trigger
export interface DropPanelInfo {}

// return when drop collect trigger
export interface DropCollectedInfo {}

// return when drag collect trigger
export interface DragCollectedInfo {
  isDragging: boolean
}
