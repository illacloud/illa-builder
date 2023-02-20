import { cloneDeep } from "lodash"
import { RefObject } from "react"
import { DropTargetMonitor } from "react-dnd"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DragInfo, DropResultInfo } from "./interface"

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

export function calcLadingPosition(
  rectPosition: RectShape,
  unitWidth: number,
  unitHeight: number,
  canvasWidth: number,
  canvasHeight: number,
  canResizeY: boolean,
) {
  const { rectLeft, rectTop, rectRight, rectBottom } = rectPosition
  let landingX = Math.round(rectLeft / unitWidth) * unitWidth
  let landingY = Math.round(rectTop / unitHeight) * unitHeight
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
  monitor: DropTargetMonitor<DragInfo, DropResultInfo>,
  containerScrollTop: number = 0,
) => {
  return {
    x: monitor.getClientOffset()!.x,
    y: monitor.getClientOffset()!.y + containerScrollTop,
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

export const getDragResult = (
  monitor: DropTargetMonitor<DragInfo, DropResultInfo>,
  containerRef: RefObject<HTMLDivElement>,
  item: ComponentNode,
  unitWidth: number,
  unitHeight: number,
  canvasWidth: number,
  action: "ADD" | "UPDATE",
  canvasHeight: number,
  canResizeY: boolean = true,
  containerTopPadding: number = 0,
  containerLeftPadding: number = 0,
) => {
  const canvasPosition = {
    x: containerRef.current?.getBoundingClientRect().x || 0,
    y: containerRef.current?.getBoundingClientRect().y || 0,
  }
  if (action === "ADD") {
    const itemPosition = getItemPosition(
      monitor,
      containerRef.current?.scrollTop,
    )
    const nodeWidthAndHeight = getNodeWidthAndHeight(
      item,
      unitWidth,
      unitHeight,
    )
    const rectCenterPosition = calcRectCenterPointPosition(
      itemPosition,
      canvasPosition,
      nodeWidthAndHeight,
    )
    const rectPosition = calcRectShapeByCenterPoint(
      rectCenterPosition,
      nodeWidthAndHeight,
    )
    const ladingPosition = calcLadingPosition(
      rectPosition,
      unitWidth,
      unitHeight,
      canvasWidth,
      canvasHeight,
      canResizeY,
    )

    return {
      ladingPosition,
      rectPosition,
      rectCenterPosition,
    }
  } else {
    const mousePointerPosition = monitor.getClientOffset()
    // mouse position

    let relativeX =
      mousePointerPosition!.x - canvasPosition.x - containerLeftPadding
    let relativeY =
      mousePointerPosition!.y -
      canvasPosition.y +
      (containerRef.current?.scrollTop || 0) -
      containerTopPadding

    let renderX =
      relativeX -
      monitor.getInitialClientOffset()!.x +
      monitor.getInitialSourceClientOffset()!.x
    let renderY =
      relativeY -
      monitor.getInitialClientOffset()!.y +
      monitor.getInitialSourceClientOffset()!.y

    let squareX = Math.round(renderX / unitWidth) * unitWidth
    let squareY = Math.round(renderY / unitHeight) * unitHeight
    let isOverstep = true
    const rectTop = relativeY
    const rectBottom = renderY + item.h * unitHeight
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
    if (renderY + item.h * unitHeight > canvasHeight && !canResizeY) {
      const overBottom =
        Math.round((renderY + item.h * unitHeight) / unitHeight) * unitHeight -
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
    }
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
