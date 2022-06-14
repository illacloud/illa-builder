import { XYCoord } from "react-dnd"
import { DragPosition } from "@/page/App/components/DotPanel/interface"

export function calculateDragPosition(
  canvasRect: DOMRect,
  monitorRect: XYCoord,
  canvasScrollLeft: number,
  canvasScrollTop: number,
  unitWidth: number,
  unitHeight: number,
  componentW: number,
  componentH: number,
  edgeWidth: number,
): DragPosition {
  // mouse position
  const relativeX = monitorRect.x - canvasRect.x + canvasScrollLeft
  const relativeY = monitorRect.y - canvasRect.y + canvasScrollTop

  // middle calc position
  const centerX = (relativeX - edgeWidth) / unitWidth
  const centerY = (relativeY - edgeWidth) / unitHeight

  // panel position
  const squareX = Math.floor(centerX - componentW / 2)
  const squareY = Math.floor(centerY - componentH / 2)

  // real position
  const renderX = relativeX - (componentW * unitWidth) / 2 - edgeWidth
  const renderY = relativeY - (componentH * unitHeight) / 2 - edgeWidth

  return {
    relativeX,
    relativeY,
    squareX,
    squareY,
    renderX,
    renderY,
  } as DragPosition
}

export function calculateXY(
  x: number,
  y: number,
  unitWidth: number,
  unitHeight: number,
): [l: number, t: number] {
  return [x * unitWidth + 1, y * unitHeight + 1]
}
