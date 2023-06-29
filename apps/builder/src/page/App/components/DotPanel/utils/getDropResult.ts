import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { WidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionState"
import { clamWidgetShape, combineWidgetInfos } from "./getDragShadow"

export interface DropResult {
  widgetLeft: number
  widgetTop: number
  widgetWidth: number
  widgetHeight: number
  displayName: string
}

export const getLayoutInfosWithRelativeCombineShape = (
  widgetLayoutInfos: WidgetLayoutInfo[],
) => {
  const combineShape = combineWidgetInfos(
    widgetLayoutInfos.map((info) => info.layoutInfo),
  )

  return widgetLayoutInfos.map((info) => {
    return {
      ...info,
      layoutInfo: {
        ...info.layoutInfo,
        x: info.layoutInfo.x - combineShape.x,
        y: info.layoutInfo.y - combineShape.y,
      },
    }
  })
}

export const getComponentLayoutInfosWithRelativeCombineShape = (
  componentNodes: ComponentNode[],
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
  componentNodes: ComponentNode[],
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
