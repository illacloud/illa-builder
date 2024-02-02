import { clamp } from "lodash-es"
import { XYCoord } from "react-dnd"
import { DRAG_EFFECT } from "@/page/App/components/ScaleSquare/components/DragContainer/interface"
import { DEFAULT_MIN_COLUMN } from "@/page/App/components/ScaleSquare/constant/widget"
import { WidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoState"
import { DragCollectedProps } from "../components/DragPreview/interface"
import { DEFAULT_BODY_COLUMNS_NUMBER, UNIT_HEIGHT } from "../constant/canvas"
import { getScrollBarContainerByDisplayName } from "../context/scrollBarContext"
import { NodeShape, getCrossingWidget, isOnlyCrossingY } from "./crossingHelper"
import { sendShadowMessageHandler } from "./sendBinaryMessage"

export const getRatio = (
  initialClientOffSet: XYCoord | null,
  initialSourceClientOffset: XYCoord | null,
  unitWidth: number,
) => {
  const initOffSet = initialClientOffSet ?? { x: 0, y: 0 }
  const initSourceOffSet = initialSourceClientOffset ?? { x: 0, y: 0 }
  const xRatio = (initSourceOffSet.x - initOffSet.x) / unitWidth
  const yRatio = (initSourceOffSet.y - initOffSet.y) / UNIT_HEIGHT
  return {
    xRatio,
    yRatio,
  }
}

export const combineWidgetInfos = (layoutInfos: NodeShape[]) => {
  const widgetXs = layoutInfos.map((info) => info.x)
  const widgetYs = layoutInfos.map((info) => info.y)
  const widgetRights = layoutInfos.map((info) => info.x + info.w)
  const widgetBottoms = layoutInfos.map((info) => info.y + info.h)
  const widgetX = Math.min(...widgetXs)
  const widgetY = Math.min(...widgetYs)
  const widgetRight = Math.max(...widgetRights)
  const widgetBottom = Math.max(...widgetBottoms)
  const widgetW = widgetRight - widgetX
  const widgetH = widgetBottom - widgetY
  return {
    x: widgetX,
    y: widgetY,
    w: widgetW,
    h: widgetH,
  }
}

export const getScrollTop = (displayName: string) => {
  let scrollTop = 0
  const ref = getScrollBarContainerByDisplayName(displayName)
  if (ref && ref.current) {
    return ref.current.scrollTop
  }

  return scrollTop
}

export const getContainerTop = (displayName: string) => {
  const ref = getScrollBarContainerByDisplayName(displayName)
  if (ref && ref.current) {
    return ref.current!.getBoundingClientRect().top
  }

  return 0
}

export const getMousePositionInfo = (
  initialClientOffSet: XYCoord | null,
  initialSourceClientOffset: XYCoord | null,
  mousePositionInViewport: XYCoord | null,
  unitWidth: number,
  containerTop: number,
  containerLeft: number,
  containerScrollTop: number,
  yOffset: number = 0,
  xOffset: number = 0,
  wRatio: number = 1,
  columnNumber: number = DEFAULT_BODY_COLUMNS_NUMBER,
) => {
  const { xRatio, yRatio } = getRatio(
    initialClientOffSet,
    initialSourceClientOffset,
    unitWidth,
  )

  const mousePosition = mousePositionInViewport ?? {
    x: 0,
    y: 0,
  }
  const realRelativeMouseLeft = mousePosition.x - containerLeft
  const realRelativeMouseTop =
    mousePosition.y + containerScrollTop - containerTop
  const realRelativeMouseX = realRelativeMouseLeft / unitWidth
  const realRelativeMouseY = realRelativeMouseTop / UNIT_HEIGHT
  const ratioRelativeMouseLeft =
    xRatio * wRatio * unitWidth + mousePosition.x - containerLeft
  const ratioRelativeMouseTop =
    yRatio * UNIT_HEIGHT + mousePosition.y + containerScrollTop - containerTop
  const ratioRelativeMouseY = ratioRelativeMouseTop / UNIT_HEIGHT
  const ratioRelativeMouseX = ratioRelativeMouseLeft / unitWidth
  const widgetX =
    Math.min(Math.round(ratioRelativeMouseX), columnNumber - 1) - xOffset
  const widgetY = Math.round(ratioRelativeMouseY) - yOffset
  const mouseHoveredTopHalf = ratioRelativeMouseY % 1 >= 0.5

  const mouseRealX = clamp(Math.floor(realRelativeMouseX), 0, columnNumber - 1)
  const mouseRealY = Math.round(realRelativeMouseY)
  const mouseRealTopHalf = realRelativeMouseY % 1 >= 0.5
  return {
    widgetY,
    widgetX,
    mouseHoveredTopHalf,
    mouseRealY,
    mouseRealX,
    mouseRealTopHalf,
  }
}

const getLeftAndRightLimit = (
  crossingWidgets: WidgetLayoutInfo[],
  defaultLeft: number,
  defaultRight: number,
  mouseRealX = defaultLeft,
) => {
  let initDefaultLeft = defaultLeft,
    initDefaultRight = defaultRight

  crossingWidgets.forEach((widgetLayoutInfo) => {
    const left = widgetLayoutInfo.layoutInfo.x,
      right = widgetLayoutInfo.layoutInfo.x + widgetLayoutInfo.layoutInfo.w
    if (left <= mouseRealX) {
      initDefaultLeft = Math.max(initDefaultLeft, right)
    }
    if (right > mouseRealX) {
      initDefaultRight = Math.min(initDefaultRight, left)
    }
  })
  return {
    leftLimit: initDefaultLeft,
    rightLimit: initDefaultRight,
  }
}

const getDragResult = (
  parentDisplayName: string,
  relativeMainNode: NodeShape,
  draggedDisplayNames: string[],
  mouseRealY = relativeMainNode.y,
  mouseRealX = relativeMainNode.x,
  mouseHoveredTopHalf: boolean = true,
  minWidth = DEFAULT_MIN_COLUMN,
) => {
  const { h, w, x, y } = relativeMainNode
  let finalY = y
  const unitWShape = {
    ...relativeMainNode,
    h: mouseRealY - finalY,
    x: mouseRealX,
    w: 1,
  }

  const crossingWidgetBottoms = getCrossingWidget(
    parentDisplayName,
    unitWShape,
    draggedDisplayNames,
  )
    .filter((widgetLayout) => widgetLayout.layoutInfo.y <= mouseRealY)
    .map(
      (widgetLayout) => widgetLayout.layoutInfo.y + widgetLayout.layoutInfo.h,
    )
  if (crossingWidgetBottoms.length > 0) {
    const maxBottomWithCrossingWidget = Math.max(...crossingWidgetBottoms)
    if (maxBottomWithCrossingWidget) {
      finalY = Math.min(maxBottomWithCrossingWidget, mouseRealY)
      mouseHoveredTopHalf = false
    }
  }

  let unitHeightShape = {
    ...relativeMainNode,
    y: finalY,
    h: 1,
  }

  if (minWidth === 1) {
    unitHeightShape = {
      ...unitHeightShape,
      w: 1,
      x: mouseRealX,
    }
  }

  const crossWithCursorLeftWidget = getCrossingWidget(
    parentDisplayName,
    unitHeightShape,
    draggedDisplayNames,
  )

  const { leftLimit, rightLimit } = getLeftAndRightLimit(
    crossWithCursorLeftWidget,
    relativeMainNode.x,
    relativeMainNode.x + relativeMainNode.w,
    mouseRealX,
  )

  if (rightLimit - leftLimit < minWidth) {
    mouseHoveredTopHalf = true
    const minCrossingY = crossWithCursorLeftWidget.reduce((prev, current) => {
        return (current?.layoutInfo?.y ?? 0) < prev?.layoutInfo?.y
          ? current
          : prev
      }).layoutInfo.y,
      maxCrossingBottom = Math.max(
        ...crossWithCursorLeftWidget.map(
          (widgetLayout) =>
            widgetLayout.layoutInfo.y + widgetLayout.layoutInfo.h,
        ),
      )
    if (minCrossingY != undefined && maxCrossingBottom != undefined) {
      finalY =
        mouseRealY - minCrossingY < maxCrossingBottom - mouseRealY
          ? minCrossingY
          : maxCrossingBottom
    }
  }

  const tempH = mouseHoveredTopHalf ? 0 : 1
  const finalYShape = {
    ...relativeMainNode,
    h: tempH,
    y: finalY,
  }

  const crossingWidgetWithFinalYShape = getCrossingWidget(
    parentDisplayName,
    finalYShape,
    draggedDisplayNames,
  )

  let finalX = x,
    finalW = w
  if (crossingWidgetWithFinalYShape.length > 0) {
    const { leftLimit, rightLimit } = getLeftAndRightLimit(
      crossingWidgetWithFinalYShape,
      relativeMainNode.x,
      relativeMainNode.x + relativeMainNode.w,
      mouseRealX,
    )
    if (rightLimit - leftLimit < minWidth) return null
    if (leftLimit !== relativeMainNode.x && leftLimit > x) {
      finalX = leftLimit
      finalW -= leftLimit - x
    }
    if (
      rightLimit !== relativeMainNode.x + relativeMainNode.w &&
      rightLimit < finalX + finalW
    ) {
      finalW = rightLimit - finalX
    }
  }
  const finalShape = {
      ...relativeMainNode,
      x: finalX,
      w: finalW,
      y: finalY,
    },
    crossingWidgetWithFinalShape = getCrossingWidget(
      parentDisplayName,
      finalShape,
      draggedDisplayNames,
    )
  let minY = h
  if (crossingWidgetWithFinalShape.length > 0) {
    minY = crossingWidgetWithFinalShape.reduce((prev, current) => {
      return current?.layoutInfo?.y < prev?.layoutInfo?.y ? current : prev
    })?.layoutInfo?.y
  }

  return {
    y: finalY,
    x: finalX,
    w: finalW,
    previewH:
      crossingWidgetWithFinalShape.length > 0
        ? minY - finalY > 0
          ? h
          : 0
        : minY,
  }
}

export const clamWidgetShape = (
  dragPreview: NodeShape,
  columnNumber: number,
  isMultiDrag: boolean,
) => {
  const { x, w, y, h } = dragPreview
  if (isMultiDrag) {
    const newW = clamp(w, 1, columnNumber)
    const newX = clamp(x, 0, columnNumber - newW)
    const newY = Math.max(y, 0)

    return {
      x: newX,
      w: newW,
      y: newY,
      previewH: h,
    }
  }
  const newX = clamp(x, 0, columnNumber)
  const newW = clamp(w, 1, columnNumber - newX)
  const newY = Math.max(y, 0)
  return {
    x: newX,
    w: newW,
    y: newY,
    previewH: h,
  }
}

const transWidgetW = (
  originWidth: number,
  originUnitW: number,
  newUnitW: number,
  newColumnNumber: number,
  minW: number = 1,
) => {
  const newW = Math.round((originWidth * originUnitW) / newUnitW)
  return clamp(newW, minW, newColumnNumber)
}

export const canCrossDifferenceColumnNumber = (draggedShapes: NodeShape[]) => {
  if (draggedShapes.length <= 1) {
    return true
  }

  const sortedLayoutInfoByY = draggedShapes.sort((node1, node2) => {
    if (node1.y < node2.y) {
      return -1
    }
    if (node1.y > node2.y) {
      return 1
    }
    return 0
  })

  for (let i = 0; i < sortedLayoutInfoByY.length; i++) {
    for (let j = i + 1; j < sortedLayoutInfoByY.length; j++) {
      if (isOnlyCrossingY(sortedLayoutInfoByY[i], sortedLayoutInfoByY[j])) {
        return false
      }
    }
  }

  return true
}

export const getDragPreview = (
  parentNodeDisplayName: string,
  unitW: number,
  dragCollectedProps: DragCollectedProps,
  columnNumber: number,
) => {
  const { initialClientOffset, initialSourceClientOffset, clientOffset, item } =
    dragCollectedProps

  if (!item) return null

  const outerContainerElement = document.querySelector(
    `[data-outer-canvas-container="${parentNodeDisplayName}"]`,
  ) as HTMLDivElement

  const outerContainerStyle = window.getComputedStyle(outerContainerElement!)
  const outerContainerLeft = parseFloat(
    outerContainerStyle.getPropertyValue("padding-left"),
  )

  const containerLeft =
    outerContainerElement!.getBoundingClientRect().left + outerContainerLeft

  const containerTop = getContainerTop(parentNodeDisplayName)
  const {
    draggedComponents,
    draggedDisplayName,
    alignTop,
    dragEffect,
    unitWWhenDragged,
    columnNumberWhenDragged,
  } = item

  const totalScrollTop = getScrollTop(parentNodeDisplayName)

  const canDrop = canCrossDifferenceColumnNumber(
    draggedComponents.map((item) => item.layoutInfo),
  )

  const draggedDisplayNames = draggedComponents.map((item) => item.displayName)
  const combineWidget = combineWidgetInfos(
    draggedComponents.map((item) => item.layoutInfo),
  )
  const currentWidgetLayoutInfo = draggedComponents.find(
    (item) => item.displayName === draggedDisplayName,
  )
  if (!currentWidgetLayoutInfo) {
    return null
  }

  let finalEffect =
    parentNodeDisplayName !== draggedComponents[0].parentNode
      ? DRAG_EFFECT.ADD
      : dragEffect

  const yOffset = currentWidgetLayoutInfo.layoutInfo.y - combineWidget.y
  const xOffset = currentWidgetLayoutInfo.layoutInfo.x - combineWidget.x

  const newW =
    dragEffect === DRAG_EFFECT.ADD || draggedDisplayNames.length > 1
      ? combineWidget.w
      : transWidgetW(combineWidget.w, unitWWhenDragged, unitW, columnNumber)

  const mousePositionInfo = getMousePositionInfo(
    initialClientOffset,
    initialSourceClientOffset,
    clientOffset,
    unitW,
    containerTop,
    containerLeft,
    totalScrollTop,
    yOffset,
    xOffset,
    1,
    columnNumber,
  )

  const moveEffect = {
    y:
      alignTop || finalEffect === DRAG_EFFECT.ADD
        ? mousePositionInfo.mouseRealY - combineWidget.y
        : mousePositionInfo.widgetY - combineWidget.y,
    x:
      finalEffect === DRAG_EFFECT.ADD
        ? mousePositionInfo.mouseRealX - combineWidget.x
        : mousePositionInfo.widgetX - combineWidget.x,
  }

  const topHalf =
    alignTop || finalEffect === DRAG_EFFECT.ADD
      ? mousePositionInfo.mouseRealTopHalf
      : mousePositionInfo.mouseHoveredTopHalf

  const currentLayoutInfo = {
    ...combineWidget,
    x: combineWidget.x + moveEffect.x,
    y: combineWidget.y + moveEffect.y,
    w: newW,
  }

  const result = getDragResult(
    parentNodeDisplayName,
    currentLayoutInfo,
    draggedDisplayNames,
    mousePositionInfo.mouseRealY,
    mousePositionInfo.mouseRealX,
    topHalf,
    draggedDisplayNames.length > 1 ? currentLayoutInfo.w : 1,
  )

  const moveEffect2 = {
    y: (result?.y ?? 0) - combineWidget.y,
    x: (result?.x ?? 0) - combineWidget.x,
  }

  if (
    draggedComponents.length === 1 &&
    mousePositionInfo.mouseRealY <= combineWidget.y + moveEffect2.y
  ) {
    item.alignTop = true
  }

  if (draggedComponents.length > 1) {
    item.alignTop =
      item.alignTop ||
      mousePositionInfo.mouseRealY <= moveEffect2.y + combineWidget.y
  }

  if (result) {
    sendShadowMessageHandler(
      1,
      parentNodeDisplayName,
      draggedDisplayNames,
      Math.floor(result.w / 2 / unitW),
      Math.floor(result.previewH / 2 / UNIT_HEIGHT),
      result.w / 2 / unitW - Math.floor(result.w / 2 / unitW),
      result.previewH / 2 / UNIT_HEIGHT -
        Math.floor(result.previewH / 2 / UNIT_HEIGHT),
      result.x,
      result.y,
      result.w,
      result.previewH,
    )

    const clamWidgetResult = clamWidgetShape(
      {
        ...result,
        h: result.previewH,
      },
      columnNumber,
      draggedComponents.length > 1,
    )
    if (
      draggedComponents.length > 1 &&
      columnNumber !== columnNumberWhenDragged &&
      !canDrop
    ) {
      item.dropResult = {
        shape: undefined,
        canDrop: false,
        columnNumberWhenDrag: columnNumberWhenDragged,
        columnNumberWhenDrop: columnNumber,
      }
      return {
        shape: clamWidgetResult,
        canDrop: false,
      }
    }
    item.dropResult = {
      shape: clamWidgetResult,
      canDrop: true,
      columnNumberWhenDrag: columnNumberWhenDragged,
      columnNumberWhenDrop: columnNumber,
    }
    return {
      shape: clamWidgetResult,
      canDrop: true,
    }
  } else {
    return null
  }
}
