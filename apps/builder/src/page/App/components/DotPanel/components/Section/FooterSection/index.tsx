import { FC, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RenderComponentCanvasContainer from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { EmptyState } from "@/page/App/components/DotPanel/components/Page/emptyState"
import {
  BASIC_CANVAS_PADDING,
  BODY_MIN_HEIGHT,
  FOOTER_MIN_HEIGHT,
} from "@/page/App/components/DotPanel/constant/canvas"
import { getCurrentDisplayName } from "@/page/App/components/DotPanel/hooks/sectionUtils"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getCurrentPageFooterSection } from "@/redux/currentApp/executionTree/executionSelector"
import { containerWrapperStyle } from "../style"
import { RenderFooterSectionProps } from "./interface"
import { applyFooterSectionWrapperStyle } from "./style"

export const RenderFooterSection: FC<RenderFooterSectionProps> = (props) => {
  const {
    bottomHeight,
    containerHeight,
    headerHeight,
    currentPageDisplayName,
    columnNumber,
  } = props

  const dispatch = useDispatch()

  const isProductionMode = useSelector(getIsILLAProductMode)
  const footerNode = useSelector(getCurrentPageFooterSection)
  let { viewPath } = useParams()

  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
    style,
  } = footerNode ?? {}
  const {
    padding,
    background = "white",
    shadowSize = "none",
    dividerColor,
  } = style ?? {}
  const handleUpdateHeight = useCallback(
    (height: number) => {
      let currentWrapperHeight = height
      const tmpBodyHeight =
        containerHeight - headerHeight - currentWrapperHeight
      if (currentWrapperHeight < FOOTER_MIN_HEIGHT) {
        currentWrapperHeight = FOOTER_MIN_HEIGHT
      }

      if (tmpBodyHeight < BODY_MIN_HEIGHT) {
        let bodyHeight = BODY_MIN_HEIGHT
        currentWrapperHeight = containerHeight - headerHeight - bodyHeight
      }

      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps: {
            bottomHeight: currentWrapperHeight,
          },
          notUseUndoRedo: true,
        }),
      )
    },
    [containerHeight, currentPageDisplayName, dispatch, headerHeight],
  )

  if (!footerNode) return null

  const currentViewDisplayName = getCurrentDisplayName(
    sectionViewConfigs,
    viewSortedKey,
    defaultViewKey,
    isProductionMode,
    viewPath,
    currentViewIndex,
  )

  const componentNode = footerNode.$childrenNode?.find(
    (displayName: string) => displayName === currentViewDisplayName,
  )

  return (
    <div
      css={applyFooterSectionWrapperStyle(
        `${bottomHeight}px`,
        "240px",
        "500px",
        dividerColor,
        background,
      )}
    >
      <div css={containerWrapperStyle}>
        {componentNode ? (
          <RenderComponentCanvasContainer
            displayName={componentNode}
            containerPadding={padding?.size ?? `${BASIC_CANVAS_PADDING}`}
            columnNumber={columnNumber}
            isRootCanvas
            safeRowNumber={0}
            handleUpdateHeight={handleUpdateHeight}
            canResizeCanvas
            minHeight={FOOTER_MIN_HEIGHT}
            shadowSize={shadowSize}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
RenderFooterSection.displayName = "RenderHeaderSection"
