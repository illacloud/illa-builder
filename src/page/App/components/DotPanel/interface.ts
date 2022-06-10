import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { HTMLAttributes } from "react"

export interface DotPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentNode: ComponentNode
  scale?: number
}

// return when drop trigger
export interface DropResultInfo {}

// return when drop collect trigger
export interface DropCollectedInfo {}

// return when drag collect trigger
export interface DragCollectedInfo {
  isDragging: boolean
}
