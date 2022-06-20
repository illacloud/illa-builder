import { XYCoord } from "react-dnd"
import { DragPosition } from "@/page/App/components/DotPanel/interface"

export function calculateDragPosition(
  canvasRect: DOMRect,
  monitorRect: XYCoord,
  canvasWidth: number,
  canvasHeight: number,
  canvasScrollLeft: number,
  canvasScrollTop: number,
  unitWidth: number,
  unitHeight: number,
  componentW: number,
  componentH: number,
  edgeWidth: number,
  blockColumns: number,
  blockRows: number,
  parentVerticalResize: boolean,
  lastSquareX?: number,
  lastSquareY?: number,
): DragPosition {
  // mouse position
  let relativeX = monitorRect.x - canvasRect.x + canvasScrollLeft - edgeWidth
  let relativeY = monitorRect.y - canvasRect.y + canvasScrollTop - edgeWidth

  // middle calc position
  const centerX = relativeX / unitWidth
  const centerY = relativeY / unitHeight

  let squareX: number
  let squareY: number

  let renderX: number
  let renderY: number

  squareX = Math.floor(centerX - componentW / 2)
  squareY = Math.floor(centerY - componentH / 2)
  renderX = relativeX - (componentW * unitWidth) / 2
  renderY = relativeY - (componentH * unitHeight) / 2

  if (squareX < 0) {
    squareX = 0
  }
  if (squareX + componentW > blockColumns) {
    squareX = blockColumns - componentW
  }
  if (squareY < 0) {
    squareY = 0
  }

  if (!parentVerticalResize) {
    if (squareY + componentH > blockRows) {
      squareY = blockRows - componentH
    }
  }

  if (!parentVerticalResize) {
    if (renderY + (componentH * unitHeight) / 2 > canvasHeight) {
      renderY = canvasHeight - (componentH * unitHeight) / 2
    }
  }

  return {
    relativeX,
    relativeY,
    squareX,
    squareY,
    renderX,
    renderY,
  } as DragPosition
}

export function calculateNearXY(
  canvasRect: DOMRect,
  monitorRect: XYCoord,
  canvasScrollLeft: number,
  canvasScrollTop: number,
  unitWidth: number,
  unitHeight: number,
  edgeWidth: number,
): [number, number] {
  // mouse position
  let relativeX = monitorRect.x - canvasRect.x + canvasScrollLeft - edgeWidth
  let relativeY = monitorRect.y - canvasRect.y + canvasScrollTop - edgeWidth

  // near position
  const nearX = Math.floor(relativeX / unitWidth)
  const nearY = Math.floor(relativeY / unitHeight)
  return [nearX, nearY]
}

export function calculateXY(
  x: number,
  y: number,
  unitWidth: number,
  unitHeight: number,
): [l: number, t: number] {
  return [x * unitWidth + 1, y * unitHeight + 1]
}
