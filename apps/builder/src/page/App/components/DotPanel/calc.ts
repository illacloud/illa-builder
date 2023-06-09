import { cloneDeep } from "lodash"
import { XYCoord } from "react-dnd"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
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

export const getNearingNodes = (
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
  const currentComponentNodes = cloneDeep(allComponentNodes)
  const sortedComponentNodes = sortComponentNodes(currentComponentNodes)
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

export const getItemPosition = (
  clientOffSet: XYCoord,
  containerScrollTop: number = 0,
) => {
  return {
    x: clientOffSet.x,
    y: clientOffSet.y + containerScrollTop,
  }
}

export const getNodeWidthAndHeight = (
  item: ComponentNode,
  unitWidth: number,
  unitHeight: number,
) => {
  return {
    w: item.w * unitWidth,
    h: item.h * unitHeight,
  }
}

interface LadingRelativePosition {
  x: number
  y: number
  isOverstep: boolean
}

interface MouseOffset {
  mouseXOffsetDec: number
  mouseXOffsetInt: number
  mouseYOffsetDec: number
  mouseYOffsetInt: number
}

export interface MoveDragResult {
  ladingPosition: Omit<LandingPosition, "relativeLandingX" | "relativeLandingY">
  rectPosition: RectShape
  rectCenterPosition: CenterPointPosition
  ladingRelativePosition: LadingRelativePosition
  mouseOffset: MouseOffset
}

const getDragResultWhenAdd = (
  clientOffset: XYCoord,
  containerPosition: XYCoord,
  containerScrollTop: number = 0,
  unitWidth: number,
  nodeWidthAndHeight: {
    w: number
    h: number
  },
  canvasWidth: number,
  canvasHeight: number,
  canResizeY: boolean,
): MoveDragResult => {
  const itemPosition = getItemPosition(clientOffset!, containerScrollTop)
  const realNodeWidthAndHeight = {
    w: nodeWidthAndHeight.w * unitWidth,
    h: nodeWidthAndHeight.h * UNIT_HEIGHT,
  }
  const rectCenterPosition = calcRectCenterPointPosition(
    itemPosition,
    containerPosition,
    realNodeWidthAndHeight,
  )
  const rectPosition = calcRectShapeByCenterPoint(
    rectCenterPosition,
    realNodeWidthAndHeight,
  )
  const ladingPosition = calcLadingPosition(
    rectPosition,
    unitWidth,
    UNIT_HEIGHT,
    canvasWidth,
    canvasHeight,
    canResizeY,
  )
  const mouseXOffsetInt = Math.floor(realNodeWidthAndHeight.w / 2 / unitWidth)
  const mouseXOffsetDec =
    realNodeWidthAndHeight.w / 2 / unitWidth - mouseXOffsetInt
  const mouseYOffsetInt = Math.floor(realNodeWidthAndHeight.h / 2 / UNIT_HEIGHT)
  const mouseYOffsetDec =
    realNodeWidthAndHeight.h / 2 / UNIT_HEIGHT - mouseYOffsetInt

  return {
    ladingPosition: {
      landingX: ladingPosition.landingX,
      landingY: ladingPosition.landingY,
      isOverstep: ladingPosition.isOverstep,
    },
    rectPosition,
    rectCenterPosition,
    ladingRelativePosition: {
      x: ladingPosition.relativeLandingX,
      y: ladingPosition.relativeLandingY,
      isOverstep: ladingPosition.isOverstep,
    },
    mouseOffset: {
      mouseXOffsetDec,
      mouseXOffsetInt,
      mouseYOffsetDec,
      mouseYOffsetInt,
    },
  }
}

const getDragResultWhenUpdate = (
  clientOffset: XYCoord,
  containerPosition: XYCoord,
  containerLeftPadding: number,
  containerTopPadding: number,
  containerScrollTop: number = 0,
  initialClientOffset: XYCoord,
  initialSourceClientOffSet: XYCoord,
  unitWidth: number,
  item: {
    w: number
    h: number
  },
  canvasWidth: number,
  canvasHeight: number,
  canResizeY: boolean,
  leftTopPosition: XYCoord,
) => {
  let relativeX = clientOffset!.x - containerPosition.x - containerLeftPadding
  let relativeY =
    clientOffset!.y -
    containerPosition.y +
    containerScrollTop -
    containerTopPadding
  let renderX = relativeX - initialClientOffset!.x + leftTopPosition.x
  let renderY = relativeY - initialClientOffset!.y + leftTopPosition.y
  const mouseXOffsetInt = Math.floor(
    (initialClientOffset!.x - initialSourceClientOffSet.x) / unitWidth,
  )
  const mouseXOffsetDec =
    (initialClientOffset!.x - initialSourceClientOffSet.x) / unitWidth -
    mouseXOffsetInt
  const mouseYOffsetInt = Math.floor(
    (initialClientOffset!.y - initialSourceClientOffSet.y) / UNIT_HEIGHT,
  )
  const mouseYOffsetDec =
    (initialClientOffset!.y - initialSourceClientOffSet.y) / UNIT_HEIGHT -
    mouseYOffsetInt

  const relativeLandingX = Math.round(renderX / unitWidth)
  const relativeLandingY = Math.round(renderY / UNIT_HEIGHT)
  let squareX = relativeLandingX * unitWidth
  let squareY = relativeLandingY * UNIT_HEIGHT
  let isOverstep = true
  const rectTop = relativeY
  const rectBottom = renderY + item.h * UNIT_HEIGHT
  const rectLeft = relativeX
  const rectRight = relativeX + item.w * unitWidth

  if (renderY < 0) {
    squareY = 0
    isOverstep = false
  }
  if (renderX < 0) {
    squareX = 0
    isOverstep = false
  }
  if (renderX + item.w * unitWidth > canvasWidth) {
    const overRight =
      Math.round((renderX + item.w * unitWidth) / unitWidth) * unitWidth -
      canvasWidth
    squareX = squareX - overRight
    isOverstep = false
  }
  if (renderY + item.h * UNIT_HEIGHT > canvasHeight && !canResizeY) {
    const overBottom =
      Math.round((renderY + item.h * UNIT_HEIGHT) / UNIT_HEIGHT) * UNIT_HEIGHT -
      canvasHeight
    squareY = squareY - overBottom
    isOverstep = false
  }

  return {
    ladingPosition: {
      landingX: squareX,
      landingY: squareY,
      isOverstep,
    },
    rectPosition: {
      rectTop,
      rectLeft,
      rectRight,
      rectBottom,
    },
    rectCenterPosition: {
      x: renderX,
      y: renderY,
    },
    ladingRelativePosition: {
      x: relativeLandingX,
      y: relativeLandingY,
      isOverstep,
    },
    mouseOffset: {
      mouseXOffsetDec,
      mouseXOffsetInt,
      mouseYOffsetDec,
      mouseYOffsetInt,
    },
  }
}

export const getDragResult = (
  action: "ADD" | "UPDATE",
  clientOffset: XYCoord,
  initialClientOffset: XYCoord,
  initialSourceClientOffSet: XYCoord,
  containerPosition: XYCoord,
  containerScrollTop: number = 0,
  unitWidth: number,
  item: {
    w: number
    h: number
  },
  canvasWidth: number,
  canvasHeight: number,
  canResizeY: boolean,
  containerLeftPadding: number,
  containerTopPadding: number,
  leftTopPosition: XYCoord,
) => {
  if (action === "ADD") {
    return getDragResultWhenAdd(
      clientOffset!,
      containerPosition,
      containerScrollTop,
      unitWidth,
      item,
      canvasWidth,
      canvasHeight,
      canResizeY,
    )
  } else {
    return getDragResultWhenUpdate(
      clientOffset!,
      containerPosition,
      containerLeftPadding,
      containerTopPadding,
      containerScrollTop,
      initialClientOffset!,
      initialSourceClientOffSet!,
      unitWidth,
      item,
      canvasWidth,
      canvasHeight,
      canResizeY,
      leftTopPosition,
    )
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
