import { HTMLAttributes } from "react"

export interface DragShadowSquareProps extends HTMLAttributes<HTMLDivElement> {
  isConflict?: boolean
  height: number
  width: number
}
