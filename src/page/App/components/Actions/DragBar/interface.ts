import { HTMLAttributes, RefObject } from "react"

export interface DragBarProps extends HTMLAttributes<HTMLDivElement> {
  resizeRef: RefObject<HTMLDivElement>
  minHeight?: number
  setContainerDimensions?: (height: number) => void
}
