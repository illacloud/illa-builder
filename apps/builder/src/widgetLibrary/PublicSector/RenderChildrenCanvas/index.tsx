import { FC } from "react"
import { useSelector } from "react-redux"
import { RenderComponentCanvasContainer } from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { LIKE_CONTAINER_WIDGET_PADDING } from "@/page/App/components/ScaleSquare/constant/widget"
import { getIsILLAEditMode, isShowDot } from "@/redux/config/configSelector"
import { ContainerEmptyState } from "@/widgetLibrary/ContainerWidget/emptyState"
import { IRenderChildrenCanvasProps } from "./interface"

export const RenderChildrenCanvas: FC<IRenderChildrenCanvasProps> = (props) => {
  const {
    currentComponentNode,
    columnNumber,
    canResizeCanvas = false,
    handleUpdateHeight,
  } = props
  const isEditMode = useSelector(getIsILLAEditMode)
  const canShowDots = useSelector(isShowDot)

  if (
    isEditMode &&
    ((!canShowDots &&
      Array.isArray(currentComponentNode.childrenNode) &&
      currentComponentNode.childrenNode.length === 0) ||
      !currentComponentNode.displayName)
  ) {
    return <ContainerEmptyState />
  }

  return (
    <RenderComponentCanvasContainer
      displayName={currentComponentNode.displayName}
      containerPadding={LIKE_CONTAINER_WIDGET_PADDING}
      columnNumber={columnNumber}
      handleUpdateHeight={handleUpdateHeight}
      canResizeCanvas={canResizeCanvas}
      safeRowNumber={0}
    />
  )
}
