import { clamp } from "lodash-es"
import { NodeShape } from "@/page/App/components/DotPanel/utils/crossingHelper"
import { DEFAULT_MIN_COLUMN } from "@/page/App/components/ScaleSquare/constant/widget"

export const fixWidgetPosition = (
  nodeShape: NodeShape,
  minH: number,
  columnNumber: number,
) => {
  const y = clamp(nodeShape.y, 0, Infinity)
  const h = clamp(nodeShape.h, minH, Infinity)
  const w = clamp(nodeShape.w, DEFAULT_MIN_COLUMN, columnNumber)
  const x = clamp(nodeShape.x, 0, columnNumber - w)
  return {
    x,
    y,
    w,
    h,
  }
}
