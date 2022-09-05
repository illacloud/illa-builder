import { cloneDeep } from "lodash"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

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

export type RectangleType = {
  left: number
  right: number
  top: number
  bottom: number
}

const getComponentRect = (component: ComponentNode): RectangleType => {
  const { x, y, w, h } = component
  return {
    left: x,
    right: x + w,
    top: y,
    bottom: y + h,
  }
}

export const isCrossing = (
  componentNode1: ComponentNode,
  componentNode2: ComponentNode,
) => {
  const rectangle1 = getComponentRect(componentNode1)
  const rectangle2 = getComponentRect(componentNode2)
  return !(
    rectangle2.left >= rectangle1.right ||
    rectangle2.right <= rectangle1.left ||
    rectangle2.top >= rectangle1.bottom ||
    rectangle2.bottom <= rectangle1.top
  )
}

export const changeCrossingNodePosition = (
  currentComponent: ComponentNode,
  otherComponent: ComponentNode[],
  walkedDisplayNameSet: Set<string>,
) => {
  walkedDisplayNameSet.add(currentComponent.displayName)
  const changedNode: ComponentNode[] = []
  for (let i = 0; i < otherComponent.length; i++) {
    if (walkedDisplayNameSet.has(otherComponent[i].displayName)) {
      continue
    }
    if (isCrossing(otherComponent[i], currentComponent)) {
      otherComponent[i] = {
        ...otherComponent[i],
        y: currentComponent.y + currentComponent.h,
      }
      changedNode.push(otherComponent[i])
    }
  }
  for (let i = 0; i < changedNode.length; i++) {
    changeCrossingNodePosition(
      changedNode[i],
      otherComponent,
      walkedDisplayNameSet,
    )
  }
}

export const getCrossingNodeNewPosition = (
  currentNode: ComponentNode,
  allComponentNode: ComponentNode[],
) => {
  const otherComponents = cloneDeep(allComponentNode)
  const indexOfAllComponentNode = otherComponents.findIndex(
    (curr) => curr.displayName === currentNode.displayName,
  )
  if (indexOfAllComponentNode > -1) {
    otherComponents.splice(indexOfAllComponentNode, 1)
  }
  let res: Map<string, ComponentNode> = new Map(),
    queue: ComponentNode[] = []

  queue.push(currentNode)
  while (queue.length !== 0) {
    let length = queue.length
    const indexOfAllComponentNode = otherComponents.findIndex(
      (curr) => curr.displayName === queue[0].displayName,
    )
    if (indexOfAllComponentNode > -1) {
      otherComponents.splice(indexOfAllComponentNode, 1)
    }
    const walkedSet = new Set()
    for (let i = 0; i < length; i++) {
      let node = queue.shift() as ComponentNode
      for (let i = 0; i < otherComponents.length; i++) {
        if (otherComponents[i].displayName === node.displayName) {
          continue
        }
        if (isCrossing(otherComponents[i], node)) {
          otherComponents[i] = {
            ...otherComponents[i],
            y: node.y + node.h,
          }
          walkedSet.add(otherComponents[i].displayName)
          res.set(otherComponents[i].displayName, otherComponents[i])
          const index = queue.findIndex(
            (node) => node.displayName === otherComponents[i].displayName,
          )
          if (index > -1) {
            queue.splice(index, 1, otherComponents[i])
          } else {
            queue.push(otherComponents[i])
          }
        }
      }
    }
  }
  return res
}
