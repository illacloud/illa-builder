import { HTMLAttributes, RefObject } from "react"

export interface DragBarProps extends HTMLAttributes<HTMLDivElement> {
  resizeRef: RefObject<HTMLDivElement>
  placeholderRef?: RefObject<HTMLDivElement>
  minHeight?: number
  getMaxHeight?: () => number | undefined
  setContainerDimensions?: (height: number) => void
  onChange?: () => void
}
