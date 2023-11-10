export interface IRenderChildrenCanvasProps {
  columnNumber: number
  handleUpdateHeight: (height: number) => void
  canResizeCanvas?: boolean
  containerPadding?: string
  displayName: string
}
