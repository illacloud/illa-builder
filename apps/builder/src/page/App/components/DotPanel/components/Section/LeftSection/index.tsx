import { AnimatePresence, motion } from "framer-motion"
import { FC, useCallback } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { NextIcon } from "@illa-design/react"
import RenderComponentCanvasContainer from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { EmptyState } from "@/page/App/components/DotPanel/components/Page/emptyState"
import { BASIC_CANVAS_PADDING } from "@/page/App/components/DotPanel/constant/canvas"
import { getCurrentDisplayName } from "@/page/App/components/DotPanel/hooks/sectionUtils"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { getCurrentPageLeftSection } from "@/redux/currentApp/executionTree/executionSelector"
import {
  applyCloseFoldPositionStyle,
  applyHorizontalAnimationWrapperStyle,
  applyNoBottomPaddingStyle,
  applyOpenFoldPositionStyle,
  containerWrapperStyle,
  openFoldWrapperStyle,
  rotaIconStyle,
} from "../style"
import { RenderLeftSectionProps } from "./interface"
import { applyLeftSectionWrapperStyle } from "./style"

export const RenderLeftSection: FC<RenderLeftSectionProps> = (props) => {
  const { showFoldIcon, isFold, leftWidth, setIsLeftFold, columnNumber } = props

  const isProductionMode = useSelector(getIsILLAProductMode)
  const leftSectionNode = useSelector(getCurrentPageLeftSection)
  let { viewPath } = useParams()

  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
    style,
  } = leftSectionNode ?? {}
  const {
    padding,
    background = "white",
    shadowSize = "none",
    dividerColor,
  } = style ?? {}
  const currentViewDisplayName = getCurrentDisplayName(
    sectionViewConfigs,
    viewSortedKey,
    defaultViewKey,
    isProductionMode,
    viewPath,
    currentViewIndex,
  )

  const componentNode = leftSectionNode?.$childrenNode?.find(
    (node: string) => node === currentViewDisplayName,
  )

  const handleOnClickFoldIcon = useCallback(() => {
    setIsLeftFold(!isFold)
  }, [isFold, setIsLeftFold])

  if (!leftSectionNode) return null

  return (
    <div
      css={applyLeftSectionWrapperStyle(
        `${isFold ? 40 : leftWidth}px`,
        "0px",
        isFold,
        dividerColor,
        background,
      )}
    >
      <div css={applyHorizontalAnimationWrapperStyle(isFold, "left")}>
        <div
          css={[containerWrapperStyle, applyNoBottomPaddingStyle(showFoldIcon)]}
        >
          {componentNode ? (
            <RenderComponentCanvasContainer
              displayName={componentNode}
              containerPadding={padding?.size ?? `${BASIC_CANVAS_PADDING}`}
              columnNumber={columnNumber}
              isRootCanvas
              shadowSize={shadowSize}
            />
          ) : (
            <EmptyState />
          )}

          <AnimatePresence>
            {showFoldIcon && !isFold && (
              <motion.div
                css={[openFoldWrapperStyle, applyCloseFoldPositionStyle]}
                onClick={handleOnClickFoldIcon}
                initial={{ x: 34 }}
                animate={{ x: 0 }}
                exit={{ x: 34 }}
                transition={{ duration: 0.3 }}
              >
                <NextIcon css={rotaIconStyle} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
