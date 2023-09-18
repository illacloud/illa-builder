export interface RenderComponentCanvasContainerProps {
  displayName: string
  containerPadding: string
  columnNumber?: number
  isRootCanvas?: boolean
  canResizeCanvas?: boolean
  safeRowNumber?: number
  handleUpdateHeight?: (height: number) => void
  minHeight?: number
  background?: string
  shadowSize?: "none" | "small" | "medium" | "large"
}

export interface DropCollectedProps {
  isOver: boolean
}

export interface DropResultInfo {
  isDropOnCanvas: boolean
}
