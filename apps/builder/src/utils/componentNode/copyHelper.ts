import { ComponentTreeNode } from "@illa-public/public-types"
import {
  clamWidgetShape,
  combineWidgetInfos,
} from "@/page/App/components/DotPanel/utils/getDragShadow"

export const getComponentLayoutInfosWithRelativeCombineShape = (
  componentNodes: ComponentTreeNode[],
) => {
  const combineShape = combineWidgetInfos(componentNodes)

  return componentNodes.map((node) => {
    return {
      ...node,
      x: node.x - combineShape.x,
      y: node.y - combineShape.y,
    }
  })
}

export const getComponentNodeResultByRelativeCombineShape = (
  componentNodes: ComponentTreeNode[],
  columnNumber: number,
) => {
  const relativeInfos =
    getComponentLayoutInfosWithRelativeCombineShape(componentNodes)

  const square = combineWidgetInfos(componentNodes)

  const clamSquare = clamWidgetShape(
    square,
    columnNumber,
    componentNodes.length > 1,
  )

  const canUsedClamSSquareW = componentNodes.length <= 1

  return relativeInfos
    .map((info) => ({
      ...info,
      x: info.x + clamSquare.x,
      y: info.y + clamSquare.y,
      w: canUsedClamSSquareW ? clamSquare.w : info.w,
    }))
    .map((node) => {
      const clamSquareShape = clamWidgetShape(
        node,
        columnNumber,
        componentNodes.length > 1,
      )
      return {
        ...node,
        x: clamSquareShape.x,
        y: clamSquareShape.y,
        w: clamSquareShape.w,
      }
    })
}
