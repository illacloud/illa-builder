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
import { getCurrentPageRightSection } from "@/redux/currentApp/executionTree/executionSelector"
import {
  applyHorizontalAnimationWrapperStyle,
  applyNoBottomPaddingStyle,
  applyOpenFoldPositionStyle,
  containerWrapperStyle,
  openFoldWrapperStyle,
} from "../style"
import { RenderRightSectionProps } from "./interface"
import { applyRightSectionWrapperStyle } from "./style"

export const RenderRightSection: FC<RenderRightSectionProps> = (props) => {
  const { showFoldIcon, isFold, rightWidth, setIsRightFold, columnNumber } =
    props

  const isProductionMode = useSelector(getIsILLAProductMode)
  const rightSection = useSelector(getCurrentPageRightSection)
  let { viewPath } = useParams()
  const handleOnClickFoldIcon = useCallback(() => {
    setIsRightFold(!isFold)
  }, [isFold, setIsRightFold])
  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
    style,
  } = rightSection ?? {}
  const {
    padding,
    background = "white",
    shadowSize,
    dividerColor,
  } = style ?? {}
  if (!rightSection) return null

  const currentViewDisplayName = getCurrentDisplayName(
    sectionViewConfigs,
    viewSortedKey,
    defaultViewKey,
    isProductionMode,
    viewPath,
    currentViewIndex,
  )

  const componentNode = rightSection?.$childrenNode?.find(
    (node: string) => node === currentViewDisplayName,
  )

  return (
    <div
      css={applyRightSectionWrapperStyle(
        `${isFold ? 40 : rightWidth}px`,
        "0px",
        isFold,
        dividerColor,
        background,
      )}
    >
      <div css={applyHorizontalAnimationWrapperStyle(isFold, "right")}>
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
                css={[
                  openFoldWrapperStyle,
                  applyOpenFoldPositionStyle("right"),
                ]}
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
      </div>

      <AnimatePresence>
        {isFold && (
          <motion.div
            css={[openFoldWrapperStyle, applyOpenFoldPositionStyle("right")]}
            onClick={handleOnClickFoldIcon}
            initial={{ x: 34, rotate: 180 }}
            animate={{ x: 0, rotate: 180 }}
            exit={{ x: 34, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <NextIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
RenderRightSection.displayName = "RenderRightSection"
