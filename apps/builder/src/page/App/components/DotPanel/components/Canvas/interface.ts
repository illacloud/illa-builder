export interface RenderComponentCanvasContainerProps {
  displayName: string
  containerPadding: number
  columnNumber?: number
  isRootCanvas?: boolean
  canResizeCanvas?: boolean
  safeRowNumber?: number
  handleUpdateHeight?: (height: number) => void
  minHeight?: number
}

export interface DropCollectedProps {
  isOver: boolean
}

export interface DropResultInfo {
  isDropOnCanvas: boolean
}
