import { HTMLAttributes } from "react"

export interface DragShadowSquareProps extends HTMLAttributes<HTMLDivElement> {
  isConflict?: boolean
  h: number
  w: number
}
