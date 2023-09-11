import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

interface ItemPosition {
  x: number
  y: number
}

export interface CanvasPosition {
  x: number
  y: number
}

interface NodeWidthAndHeight {
  w: number
  h: number
}

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

export interface LandingPosition {
  isOverstep: boolean
  landingX: number
  landingY: number
  relativeLandingX: number
  relativeLandingY: number
}

export function calcLadingPosition(
  rectPosition: RectShape,
  unitWidth: number,
  unitHeight: number,
  canvasWidth: number,
  canvasHeight: number,
  canResizeY: boolean,
): LandingPosition {
  const { rectLeft, rectTop, rectRight, rectBottom } = rectPosition
  const relativeLandingX = Math.round(rectLeft / unitWidth)
  const relativeLandingY = Math.round(rectTop / unitHeight)
  let landingX = relativeLandingX * unitWidth
  let landingY = relativeLandingY * unitHeight
  let isOverstep = true
  if (rectTop < 0) {
    landingY = 0
    isOverstep = false
  }
  if (rectLeft < 0) {
    landingX = 0
    isOverstep = false
  }
  if (rectRight > canvasWidth) {
    const overRight =
      Math.round(rectRight / unitWidth) * unitWidth - canvasWidth
    landingX = landingX - overRight
    isOverstep = false
  }
  if (rectBottom > canvasHeight && !canResizeY) {
    const overBottom =
      Math.round(rectBottom / unitHeight) * unitHeight - canvasHeight
    landingY = landingY - overBottom
    isOverstep = false
  }
  return {
    isOverstep,
    landingX,
    landingY,
    relativeLandingX,
    relativeLandingY,
  }
}

export type RectangleType = {
  left: number
  right: number
  top: number
  bottom: number
}

const sortComponentNodesOnlyY = (componentNodes: ComponentNode[]) => {
  return componentNodes.sort((node1, node2) => {
    if (node1.y < node2.y) {
      return -1
    }
    if (node1.y > node2.y) {
      return 1
    }
    return 0
  })
}

export const sortComponentNodes = (componentNodes: ComponentNode[]) => {
  return componentNodes.sort((node1, node2) => {
    if (node1.y < node2.y) {
      return -1
    }
    if (node1.y > node2.y) {
      return 1
    }
    if (node1.y === node2.y) {
      if (node1.x > node2.x) {
        return 1
      }
      if (node1.x < node2.x) {
        return -1
      }
    }
    return 0
  })
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
  otherNode: ComponentNode,
  mainNode: ComponentNode,
) => {
  const otherRect = getComponentRect(otherNode)
  const mainRect = getComponentRect(mainNode)
  return !(
    mainRect.left >= otherRect.right ||
    mainRect.right <= otherRect.left ||
    mainRect.top >= otherRect.bottom ||
    mainRect.bottom <= otherRect.top
  )
}

export const isNearingAtY = (
  otherNode: ComponentNode,
  mainNode: ComponentNode,
) => {
  const otherRect = getComponentRect(otherNode)
  const mainRect = getComponentRect(mainNode)
  return (
    (mainRect.left <= otherRect.right || mainRect.right >= otherRect.left) &&
    mainRect.bottom === otherRect.top
  )
}

export const getCrossingNodeNewPosition = (
  currentNode: ComponentNode,
  allComponentNode: ComponentNode[],
) => {
  let otherComponents = allComponentNode.filter(
    (curNode) => curNode.displayName !== currentNode.displayName,
  )

  let res: Map<string, ComponentNode> = new Map(),
    queue: ComponentNode[] = []

  queue.push(currentNode)
  while (queue.length !== 0) {
    let length = queue.length
    otherComponents = otherComponents.filter(
      (curNode) => curNode.displayName !== queue[0].displayName,
    )
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

export const getNearingNodes = (
  currentNode: ComponentNode,
  allComponentNode: ComponentNode[],
) => {
  let otherComponents = allComponentNode.filter(
    (cur) => cur.displayName !== currentNode.displayName,
  )

  let res: Map<string, ComponentNode> = new Map(),
    queue: ComponentNode[] = []

  queue.push(currentNode)
  while (queue.length !== 0) {
    let length = queue.length

    otherComponents = otherComponents.filter(
      (cur) => cur.displayName !== queue[0].displayName,
    )

    const walkedSet = new Set()
    for (let i = 0; i < length; i++) {
      let node = queue.shift() as ComponentNode
      for (let i = 0; i < otherComponents.length; i++) {
        if (otherComponents[i].displayName === node.displayName) {
          continue
        }
        if (isNearingAtY(otherComponents[i], node)) {
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

export const applyEffectMapToComponentNodes = (
  effectMap: Map<string, ComponentNode>,
  componentNodes: ComponentNode[],
) => {
  return componentNodes.map((node) => {
    if (effectMap.has(node.displayName)) {
      return effectMap.get(node.displayName) as ComponentNode
    }
    return node
  })
}

export const getReflowResult = (
  currentNode: ComponentNode,
  allComponentNodes: ComponentNode[],
  exceptSelf: boolean = true,
) => {
  const sortedComponentNodes = sortComponentNodes(allComponentNodes)
  const effectResultMap = getCrossingNodeNewPosition(
    currentNode,
    sortedComponentNodes,
  )
  let finalState = applyEffectMapToComponentNodes(
    effectResultMap,
    sortedComponentNodes,
  )

  if (exceptSelf) {
    finalState = finalState.filter(
      (node) => node.displayName !== currentNode.displayName,
    )
  }
  return {
    effectResultMap,
    finalState,
  }
}

export const getNearComponentNodes = (
  currentNode: ComponentNode,
  allComponentNodes: ComponentNode[],
) => {
  const sortedComponentNodes = sortComponentNodesOnlyY(allComponentNodes)
  return getNearingNodes(currentNode, sortedComponentNodes)
}

export const isAddAction = (
  x: number,
  y: number,
  oldParentDisplayName: string | null,
  currentParentDisplayName: string,
) => {
  return (
    (x === -1 && y === -1) || oldParentDisplayName !== currentParentDisplayName
  )
}

export function getMousePointerPosition(
  mouseOffsetX: number,
  mouseOffsetY: number,
  unitWidth: number,
  unitHeight: number,
  containerMaxWidthDotNumber: number,
): number[] {
  let preX = Math.floor(mouseOffsetX / unitWidth)
  preX = Math.min(preX, containerMaxWidthDotNumber)
  let preY = Math.floor(mouseOffsetY / unitHeight)
  return [preX, preY]
}
