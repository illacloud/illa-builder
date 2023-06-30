export interface RenderComponentCanvasContainerProps {
  displayName: string
  containerPadding: number
  columnNumber?: number
  isRootCanvas?: boolean
}

export interface DropCollectedProps {
  isOver: boolean
}

export interface DropResultInfo {
  isDropOnCanvas: boolean
}
