import { HTMLAttributes } from "react"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { BarPosition } from "@/page/App/components/ScaleSquare/style"

export type ScaleSquareType = "error" | "normal" | "production"

export interface ScaleSquareProps extends HTMLAttributes<HTMLDivElement> {
  componentNode: ComponentNode
  h: number
  w: number
  x: number
  y: number
  unitW: number
  unitH: number
}

export interface DragResize {
  position: BarPosition
  node: ComponentNode
}

export interface DragResizeCollected {
  resizing: boolean
}

export interface MoveBarProps {
  displayName: string
  isError: boolean
  maxWidth: number
  selected: boolean
  isEditor: boolean
}
