import { cloneDeep } from "lodash"
import { RefObject } from "react"
import { DropTargetMonitor } from "react-dnd"
import {
  getDragResult,
  getReflowResult,
  isAddAction,
} from "@/page/App/components/DotPanel/calc"
import {
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { UpdateComponentNodeLayoutInfoPayload } from "@/redux/currentApp/editor/components/componentsPayload"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export const getScaleItem = (
  blockColumns: number,
  currentColumnNumber: number,
  item: ComponentNode,
) => {
  const scale = blockColumns / currentColumnNumber

  return {
    ...item,
    w:
      Math.ceil(item.w * scale) < item.minW
        ? item.minW
        : Math.ceil(item.w * scale),
  }
}

export const moveCallback = (
  dragInfo: DragInfo,
  blockColumns: number,
  containerWidgetDisplayName: string,
  monitor: DropTargetMonitor<DragInfo, DropResultInfo>,
  containerRef: RefObject<HTMLDivElement>,
  unitWidth: number,
  canvasBoundingClientRect: DOMRect,
  canResizeY: boolean,
  containerPadding: number,
  isFreezeCanvas: boolean,
  currentDragStartScrollTop: number,
) => {
  const { item, currentColumnNumber, draggedSelectedComponents } = dragInfo

  const scaleItemsShape = getLargeItemSharpe(
    draggedSelectedComponents,
    blockColumns,
    currentColumnNumber,
  )

  let scaleItem: ComponentNode = {
    ...item,
    ...scaleItemsShape,
    displayName: "largeItem",
    type: "LARGE_ITEM",
  }
  const actionName = isAddAction(
    item.x,
    item.y,
    item.parentNode,
    containerWidgetDisplayName,
  )
    ? "ADD"
    : "UPDATE"

  const containerClientRect = containerRef.current?.getBoundingClientRect()
  const containerPosition = {
    x: containerClientRect?.x || 0,
    y: containerClientRect?.y || 0,
  }
  const scrollTop = containerRef.current?.scrollTop
  const clientOffset = monitor.getClientOffset()
  const initialClientOffset = monitor.getInitialClientOffset()
  const initialSourceClientOffSet = monitor.getInitialSourceClientOffset()

  const dragResult = getDragResult(
    actionName,
    clientOffset!,
    initialClientOffset!,
    initialSourceClientOffSet!,
    containerPosition,
    scrollTop,
    unitWidth,
    scaleItem,
    canvasBoundingClientRect.width,
    canvasBoundingClientRect.height,
    canResizeY,
    containerPadding,
    containerPadding,
    {
      x: scaleItem.x * unitWidth + containerPadding + containerPosition!.x,
      y:
        scaleItem.y * UNIT_HEIGHT +
        containerPadding +
        containerPosition!.y -
        currentDragStartScrollTop,
    },
  )

  const { ladingPosition } = dragResult
  const { landingX, landingY } = ladingPosition

  let childrenNodes = dragInfo.childrenNodes.filter(
    (node) => node.parentNode === containerWidgetDisplayName,
  )
  let finalChildrenNodes: ComponentNode[] = []
  let finalEffectResultMap: Map<string, ComponentNode> = new Map()
  /**
   * generate component node with new position
   */
  const newItem: ComponentNode = {
    ...scaleItem,
    parentNode: containerWidgetDisplayName || "root",
    x: Math.round(landingX / unitWidth),
    y: Math.round(landingY / UNIT_HEIGHT),
    unitW: unitWidth,
    unitH: UNIT_HEIGHT,
  }

  if (item.type !== "MODAL_WIDGET") {
    /**
     * only when add component nodes
     */

    const draggableDisplayNames = draggedSelectedComponents.map(
      (node) => node.displayName,
    )

    const allChildrenNodes = childrenNodes.filter((node) => {
      return !draggableDisplayNames.includes(node.displayName)
    })

    const { finalState, effectResultMap } = getReflowResult(
      newItem,
      allChildrenNodes,
      true,
    )
    finalChildrenNodes = finalState
    finalEffectResultMap = effectResultMap
  }
  let updateSlice: UpdateComponentNodeLayoutInfoPayload[] | undefined
  if (!isFreezeCanvas) {
    updateSlice = finalChildrenNodes.map((node) => {
      return {
        displayName: node.displayName,
        layoutInfo: {
          x: node.x,
          y: node.y,
          w: node.w,
          h: node.h,
          unitW: node.unitW,
        },
      }
    })
  }
  return {
    dragResult,
    reflowUpdateSlice: updateSlice,
    newEffectResultMap: finalEffectResultMap,
    scaleItem,
  }
}

export const getLargeItemSharpe = (
  draggedSelectedComponents: ComponentNode[],
  columnNumber: number,
  currentColumnNumber: number,
) => {
  const scaleItems = draggedSelectedComponents.map((item) =>
    getScaleItem(columnNumber, currentColumnNumber, item),
  )
  const top = Math.min(...scaleItems.map((item) => item.y))
  const left = Math.min(...scaleItems.map((item) => item.x))
  const bottom = Math.max(...scaleItems.map((item) => item.y + item.h))
  const right = Math.max(...scaleItems.map((item) => item.x + item.w))
  return {
    x: left,
    y: top,
    w: right - left,
    h: bottom - top,
  }
}
