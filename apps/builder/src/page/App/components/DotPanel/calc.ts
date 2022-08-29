interface ItemPosition {
  x: number
  y: number
}

interface CanvasPosition {
  x: number
  y: number
}

interface NodeWidthAndHeight {
  w: number
  h: number
}

interface NodePosition {
  x: number
  y: number
}

type NodeShape = NodeWidthAndHeight & NodePosition

interface CenterPointPosition {
  x: number
  y: number
}

export function calcRectCenterPointPosition(
  itemPosition: ItemPosition,
  canvasPosition: CanvasPosition,
  nodeWidthAndHeight: NodeWidthAndHeight,
): CenterPointPosition {
  const { x: itemX, y: itemY } = itemPosition
  const { x: canvasX, y: canvasY } = canvasPosition
  const { w: nodeW, h: nodeH } = nodeWidthAndHeight
  const pointX = itemX - canvasX
  const pointY = itemY - canvasY
  const centerX = pointX - nodeW / 2
  const centerY = pointY - nodeH / 2
  return {
    x: centerX,
    y: centerY,
  }
}

interface RectShape {
  rectTop: number
  rectRight: number
  rectBottom: number
  rectLeft: number
}
export function calcRectShapeByCenterPoint(
  centerPointPosition: CenterPointPosition,
  nodeWidthAndHeight: NodeWidthAndHeight,
): RectShape {
  const rectTop = centerPointPosition.y
  const rectLeft = centerPointPosition.x
  const rectRight = rectLeft + nodeWidthAndHeight.w
  const rectBottom = rectTop + nodeWidthAndHeight.h
  return {
    rectTop,
    rectLeft,
    rectRight,
    rectBottom,
  }
}

export function calcLunchPosition(
  rectPosition: RectShape,
  unitWidth: number,
  unitHeight: number,
  canvasWidth: number,
) {
  const { rectLeft, rectTop, rectRight } = rectPosition
  let lunchX = Math.round(rectLeft / unitWidth) * unitWidth
  let lunchY = Math.round(rectTop / unitHeight) * unitHeight
  let isOverstep = true
  if (rectTop < 0) {
    lunchY = 0
    isOverstep = false
  }
  if (rectLeft < 0) {
    lunchX = 0
    isOverstep = false
  }
  if (rectRight > canvasWidth) {
    const overRight =
      Math.round(rectRight / unitWidth) * unitWidth - canvasWidth
    lunchX = lunchX - overRight
    isOverstep = false
  }
  return {
    isOverstep,
    lunchX,
    lunchY,
  }
}
