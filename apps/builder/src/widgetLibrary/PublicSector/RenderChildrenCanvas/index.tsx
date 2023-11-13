import { ComponentMapNode } from "@illa-public/public-types"
import { FC, memo } from "react"
import { useSelector } from "react-redux"
import RenderComponentCanvasContainer from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import {
  SAFE_ROWS,
  UNIT_HEIGHT,
} from "@/page/App/components/DotPanel/constant/canvas"
import { LIKE_CONTAINER_WIDGET_PADDING } from "@/page/App/components/ScaleSquare/constant/widget"
import { getIsILLAEditMode, isShowDot } from "@/redux/config/configSelector"
import { getComponentMap } from "@/redux/currentApp/components/componentsSelector"
import { RootState } from "@/store"
import { ContainerEmptyState } from "@/widgetLibrary/ContainerWidget/emptyState"
import { IRenderChildrenCanvasProps } from "./interface"

const RenderChildrenCanvas: FC<IRenderChildrenCanvasProps> = (props) => {
  const {
    columnNumber,
    canResizeCanvas = false,
    handleUpdateHeight,
    containerPadding,
    displayName,
  } = props
  const isEditMode = useSelector(getIsILLAEditMode)
  const canShowDots = useSelector(isShowDot)
  const targetNode = useSelector<RootState, ComponentMapNode>((state) => {
    const components = getComponentMap(state)
    return components[displayName]
  })

  const hasChildrenNode = targetNode?.childrenNode?.length > 0

  if (isEditMode && ((!canShowDots && !hasChildrenNode) || !displayName)) {
    return (
      <ContainerEmptyState
        handleUpdateHeight={handleUpdateHeight}
        containerPadding={containerPadding}
      />
    )
  }

  return (
    <RenderComponentCanvasContainer
      displayName={displayName}
      containerPadding={containerPadding ?? `${LIKE_CONTAINER_WIDGET_PADDING}`}
      columnNumber={columnNumber}
      handleUpdateHeight={handleUpdateHeight}
      canResizeCanvas={canResizeCanvas}
      safeRowNumber={canResizeCanvas ? 0 : SAFE_ROWS}
      minHeight={canResizeCanvas ? 13 * UNIT_HEIGHT : undefined}
    />
  )
}

export default memo(RenderChildrenCanvas)
