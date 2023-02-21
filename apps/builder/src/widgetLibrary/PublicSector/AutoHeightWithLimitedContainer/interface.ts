import { ResizeStartCallback } from "re-resizable"
import { RndResizeCallback } from "react-rnd"

export interface AutoHeightWithLimitedContainerProps {
  dynamicMaxHeight: number
  dynamicMinHeight: number
  containerHeight: number
  displayName: string
  resizeStart: ResizeStartCallback
  handleUpdateComponentHeight: (height: number) => void
}
