import { DEFAULT_MIN_COLUMN } from "../ScaleSquare/constant/widget"

interface WidgetShape {
  x: number
  y: number
  w: number
  h: number
  minW: number
}

export const getLargeItemShapeWithNodeScale = (
  selectedComponents: WidgetShape[],
) => {
  const top = Math.min(...selectedComponents.map((item) => item.y))
  const left = Math.min(...selectedComponents.map((item) => item.x))
  const bottom = Math.max(...selectedComponents.map((item) => item.y + item.h))
  const right = Math.max(...selectedComponents.map((item) => item.x + item.w))
  return {
    x: left,
    y: top,
    w: right - left,
    h: bottom - top,
    minW: DEFAULT_MIN_COLUMN,
  }
}
