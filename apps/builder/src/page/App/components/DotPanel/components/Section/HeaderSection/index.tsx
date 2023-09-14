import { FC, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RenderComponentCanvasContainer from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { EmptyState } from "@/page/App/components/DotPanel/components/Page/emptyState"
import {
  BASIC_CANVAS_PADDING,
  BODY_MIN_HEIGHT,
  HEADER_MIN_HEIGHT,
} from "@/page/App/components/DotPanel/constant/canvas"
import { getCurrentDisplayName } from "@/page/App/components/DotPanel/hooks/sectionUtils"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { containerWrapperStyle } from "../style"
import { RenderHeaderSectionProps } from "./interface"
import { applyHeaderSectionWrapperStyle } from "./style"

export const RenderHeaderSection: FC<RenderHeaderSectionProps> = (props) => {
  const {
    sectionNode,
    topHeight,
    containerHeight,
    footerHeight,
    currentPageDisplayName,
    columnNumber,
  } = props

  const dispatch = useDispatch()

  const executionResult = useSelector(getExecutionResult)
  const isProductionMode = useSelector(getIsILLAProductMode)
  const sectionNodeProps = executionResult[sectionNode.displayName] || {}
  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
  } = sectionNodeProps
  let { viewPath } = useParams()
  const currentViewDisplayName = getCurrentDisplayName(
    sectionViewConfigs,
    viewSortedKey,
    defaultViewKey,
    isProductionMode,
    viewPath,
    currentViewIndex,
  )

  const handleUpdateHeight = useCallback(
    (height: number) => {
      let currentWrapperHeight = height
      const tmpBodyHeight =
        containerHeight - footerHeight - currentWrapperHeight

      if (tmpBodyHeight < BODY_MIN_HEIGHT) {
        let bodyHeight = BODY_MIN_HEIGHT
        currentWrapperHeight = containerHeight - footerHeight - bodyHeight
      }

      if (currentWrapperHeight < HEADER_MIN_HEIGHT) {
        currentWrapperHeight = HEADER_MIN_HEIGHT
      }
      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps: {
            topHeight: currentWrapperHeight,
          },
          notUseUndoRedo: true,
        }),
      )
    },
    [containerHeight, currentPageDisplayName, dispatch, footerHeight],
  )

  if (!sectionNodeProps) return null

  const componentNode = sectionNode.childrenNode?.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  return (
    <div
      css={applyHeaderSectionWrapperStyle(`${topHeight}px`, "240px", "500px")}
    >
      <div css={containerWrapperStyle}>
        {componentNode ? (
          <RenderComponentCanvasContainer
            displayName={componentNode.displayName}
            containerPadding={BASIC_CANVAS_PADDING}
            columnNumber={columnNumber}
            isRootCanvas
            safeRowNumber={0}
            handleUpdateHeight={handleUpdateHeight}
            canResizeCanvas
            minHeight={HEADER_MIN_HEIGHT}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
RenderHeaderSection.displayName = "RenderHeaderSection"
