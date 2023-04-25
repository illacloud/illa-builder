import { FC, RefObject } from "react"
import { useDragDropManager } from "react-dnd"
import { getDragResult, isAddAction } from "@/page/App/components/DotPanel/calc"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { DragInfo } from "@/page/App/components/DotPanel/interface"
import { PreviewPlaceholder } from "@/page/App/components/DotPanel/previewPlaceholder"
import {
  getLargeItemSharpe,
  getScaleItem,
} from "@/page/App/components/DotPanel/utils"

interface DragPreviewProps {
  containerRef: RefObject<HTMLDivElement>
  canvasWidth: number
  canvasHeight: number
  canResizeY: boolean
  containerTopPadding: number
  containerLeftPadding: number
  unitWidth: number
  columnNumber: number
  containerWidgetDisplayName: string
  currentDragStartScrollTop: number
}

export const DragPreview: FC<DragPreviewProps> = (props) => {
  const {
    containerRef,
    canvasWidth,
    canvasHeight,
    canResizeY,
    containerTopPadding,
    containerLeftPadding,
    unitWidth,
    columnNumber,
    containerWidgetDisplayName,
    currentDragStartScrollTop,
  } = props
  const dragDropManager = useDragDropManager()
  const monitor = dragDropManager.getMonitor()
  const dragItemInfo = dragDropManager.getMonitor().getItem() as DragInfo
  if (!dragItemInfo) return null
  const { item, currentColumnNumber, draggedSelectedComponents } = dragItemInfo

  const containerClientRect = containerRef.current?.getBoundingClientRect()
  const containerPosition = {
    x: containerClientRect?.x || 0,
    y: containerClientRect?.y || 0,
  }
  const scrollTop = containerRef.current?.scrollTop
  const clientOffset = monitor.getClientOffset()
  const initialClientOffset = monitor.getInitialClientOffset()
  const initialSourceClientOffSet = monitor.getInitialSourceClientOffset()

  let scaleItem: {
    x: number
    y: number
    w: number
    h: number
  }
  if (draggedSelectedComponents.length > 1) {
    scaleItem = getLargeItemSharpe(
      draggedSelectedComponents,
      columnNumber,
      currentColumnNumber,
    )
  } else {
    scaleItem = getScaleItem(
      columnNumber,
      currentColumnNumber,
      draggedSelectedComponents[0],
    )
  }

  const actionName = isAddAction(
    item.x,
    item.y,
    item.parentNode,
    containerWidgetDisplayName,
  )
    ? "ADD"
    : "UPDATE"

  const dragResult = getDragResult(
    actionName,
    clientOffset!,
    initialClientOffset!,
    initialSourceClientOffSet!,
    containerPosition,
    scrollTop,
    unitWidth,
    scaleItem,
    canvasWidth,
    canvasHeight,
    canResizeY,
    containerLeftPadding,
    containerTopPadding,
    {
      x: scaleItem.x * unitWidth + containerLeftPadding + containerPosition!.x,
      y:
        scaleItem.y * UNIT_HEIGHT +
        containerTopPadding +
        containerPosition!.y -
        currentDragStartScrollTop,
    },
  )

  const { ladingPosition, rectCenterPosition } = dragResult
  const { landingX, landingY, isOverstep } = ladingPosition

  return (
    <PreviewPlaceholder
      x={rectCenterPosition.x}
      y={rectCenterPosition.y}
      lunchX={landingX}
      lunchY={landingY}
      w={scaleItem.w * unitWidth}
      h={scaleItem.h * UNIT_HEIGHT}
      canDrop={isOverstep}
    />
  )
}

DragPreview.displayName = "DragPreview"
