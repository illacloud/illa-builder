import { AnimatePresence, motion } from "framer-motion"
import { FC, useCallback } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { NextIcon, PreviousIcon } from "@illa-design/react"
import RenderComponentCanvasContainer from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { EmptyState } from "@/page/App/components/DotPanel/components/Page/emptyState"
import { BASIC_CANVAS_PADDING } from "@/page/App/components/DotPanel/constant/canvas"
import { getCurrentDisplayName } from "@/page/App/components/DotPanel/hooks/sectionUtils"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import {
  applyHorizontalAnimationWrapperStyle,
  applyNoBottomPaddingStyle,
  applyOpenFoldPositionStyle,
  applySideBarWrapperStyle,
  containerWrapperStyle,
  openFoldWrapperStyle,
  sideBarIconStyle,
} from "../style"
import { RenderLeftSectionProps } from "./interface"
import { applyLeftSectionWrapperStyle } from "./style"

export const RenderLeftSection: FC<RenderLeftSectionProps> = (props) => {
  const {
    sectionNode,
    showFoldIcon,
    isFold,
    leftWidth,
    setIsLeftFold,
    columnNumber,
  } = props

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

  const componentNode = sectionNode.childrenNode?.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  const handleOnClickFoldIcon = useCallback(() => {
    setIsLeftFold(!isFold)
  }, [isFold, setIsLeftFold])

  return (
    <div
      css={applyLeftSectionWrapperStyle(
        `${isFold ? 40 : leftWidth}px`,
        "0px",
        isFold,
      )}
    >
      <div css={applyHorizontalAnimationWrapperStyle(isFold, "left")}>
        <div
          css={[containerWrapperStyle, applyNoBottomPaddingStyle(showFoldIcon)]}
        >
          {componentNode ? (
            <RenderComponentCanvasContainer
              displayName={componentNode.displayName}
              containerPadding={BASIC_CANVAS_PADDING}
              columnNumber={columnNumber}
              isRootCanvas
            />
          ) : (
            <EmptyState />
          )}
          {showFoldIcon && (
            <div css={applySideBarWrapperStyle("left")}>
              <PreviousIcon
                css={sideBarIconStyle}
                onClick={handleOnClickFoldIcon}
              />
            </div>
          )}
        </div>

        {/* {isEditMode && animationComplete && (
          <div
            css={resizeHorizontalBarWrapperStyle}
            onMouseDown={handleClickMoveBar}
          >
            <div css={resizeHorizontalBarStyle} />
          </div>
        )} */}
      </div>

      <AnimatePresence>
        {isFold && (
          <motion.div
            css={[openFoldWrapperStyle, applyOpenFoldPositionStyle("left")]}
            onClick={handleOnClickFoldIcon}
            initial={{ x: -34 }}
            animate={{ x: 0 }}
            exit={{ x: -34 }}
            transition={{ duration: 0.3 }}
          >
            <NextIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
RenderLeftSection.displayName = "RenderLeftSection"
