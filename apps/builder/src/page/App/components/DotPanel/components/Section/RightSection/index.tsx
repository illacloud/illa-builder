import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { NextIcon } from "@illa-design/react"
import RenderComponentCanvasContainer from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { EmptyState } from "@/page/App/components/DotPanel/components/Page/emptyState"
import { BASIC_CANVAS_PADDING } from "@/page/App/components/DotPanel/constant/canvas"
import {
  BODY_MIN_WIDTH,
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
} from "@/page/App/components/DotPanel/constant/canvas"
import { getCurrentDisplayName } from "@/page/App/components/DotPanel/hooks/sectionUtils"
import {
  getIsILLAEditMode,
  getIsILLAProductMode,
} from "@/redux/config/configSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { SECTION_POSITION } from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { trackInEditor } from "@/utils/mixpanelHelper"
import ChangeVerticalLayoutBar from "../ChangeLayoutBar/VerticalLayoutBar"
import {
  applyHorizontalAnimationWrapperStyle,
  applyNoBottomPaddingStyle,
  applyOpenFoldPositionStyle,
  applySideBarWrapperStyle,
  containerWrapperStyle,
  disabledHorizontalBarWrapperStyle,
  horizontalWidthTipsStyle,
  openFoldWrapperStyle,
  resizeHorizontalBarStyle,
  resizeHorizontalBarWrapperStyle,
  sideBarIconStyle,
} from "../style"
import { RenderRightSectionProps } from "./interface"
import { applyRightSectionWrapperStyle } from "./style"

export const RenderRightSection: FC<RenderRightSectionProps> = (props) => {
  const {
    sectionNode,
    offsetLeft,
    containerWidth,
    leftWidth,
    currentPageDisplayName,
    rightPosition,
    showFoldIcon,
    isFold,
    rightWidth,
    setIsRightFold,
    canvasSize,
    columnNumber,
  } = props

  const executionResult = useSelector(getExecutionResult)
  const isEditMode = useSelector(getIsILLAEditMode)
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

  const [isResizeActive, setIsResizeActive] = useState(false)
  const [panelWidth, setPanelWidth] = useState(0)
  const [isInSection, setIsInSection] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(true)

  const dispatch = useDispatch()

  const handleClickMoveBar = () => {
    if (canvasSize === "fixed") {
      setPanelWidth(rightWidth)
    } else {
      const presetWidth = (rightWidth / containerWidth) * 100
      setPanelWidth(presetWidth)
    }
    setIsResizeActive(true)
  }

  useEffect(() => {
    const mouseMoveListener = (e: globalThis.MouseEvent) => {
      if (isResizeActive) {
        const { clientX } = e
        let otherPanelWidthPX = leftWidth
        let currentPointPositionX = containerWidth - (clientX - offsetLeft)
        if (currentPointPositionX < RIGHT_MIN_WIDTH) {
          currentPointPositionX = RIGHT_MIN_WIDTH
        }
        if (
          containerWidth - currentPointPositionX - otherPanelWidthPX <
          BODY_MIN_WIDTH
        ) {
          if (leftWidth !== 0) {
            otherPanelWidthPX =
              containerWidth - BODY_MIN_WIDTH - currentPointPositionX
            if (otherPanelWidthPX <= LEFT_MIN_WIDTH) {
              otherPanelWidthPX = LEFT_MIN_WIDTH
            }
          }

          currentPointPositionX =
            containerWidth - BODY_MIN_WIDTH - otherPanelWidthPX
        }
        if (canvasSize === "fixed") {
          setPanelWidth(currentPointPositionX)
          dispatch(
            componentsActions.updateTargetPagePropsReducer({
              pageName: currentPageDisplayName,
              newProps: {
                rightWidth: currentPointPositionX,
                leftWidth: otherPanelWidthPX,
              },
            }),
          )
        } else {
          const presetWidth = (currentPointPositionX / containerWidth) * 100
          const otherPanelWidth = (otherPanelWidthPX / containerWidth) * 100
          setPanelWidth(presetWidth)

          dispatch(
            componentsActions.updateTargetPagePropsReducer({
              pageName: currentPageDisplayName,
              newProps: {
                rightWidth: presetWidth,
                leftWidth: otherPanelWidth,
              },
            }),
          )
        }
      }
    }

    const mouseUpListener = () => {
      if (isResizeActive) {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.DRAG, {
          element: "page_bar",
        })
      }
      setIsResizeActive(false)
    }
    document.addEventListener("mousemove", mouseMoveListener)
    document.addEventListener("mouseup", mouseUpListener)
    return () => {
      document.removeEventListener("mousemove", mouseMoveListener)
      document.removeEventListener("mouseup", mouseUpListener)
    }
  }, [
    canvasSize,
    containerWidth,
    currentPageDisplayName,
    dispatch,
    isResizeActive,
    leftWidth,
    offsetLeft,
  ])

  const onMouseEnter = useCallback(() => {
    if (
      isEditMode &&
      !isResizeActive &&
      (rightPosition === SECTION_POSITION.BOTTOM ||
        rightPosition === SECTION_POSITION.CENTER ||
        rightPosition === SECTION_POSITION.TOP)
    ) {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.HOVER, {
        element: "page_arrow",
      })
    }
    setIsInSection(true)
  }, [isEditMode, isResizeActive, rightPosition])

  const onMouseLeave = useCallback(() => {
    setIsInSection(false)
  }, [])

  const handleOnClickFoldIcon = useCallback(() => {
    setIsRightFold(!isFold)
  }, [isFold, setIsRightFold])

  return (
    <div
      css={applyRightSectionWrapperStyle(
        `${isFold ? 40 : rightWidth}px`,
        "0px",
        isFold,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div css={applyHorizontalAnimationWrapperStyle(isFold, "right")}>
        {isInSection &&
          isEditMode &&
          !isResizeActive &&
          (rightPosition === SECTION_POSITION.BOTTOM ||
            rightPosition === SECTION_POSITION.CENTER) && (
            <ChangeVerticalLayoutBar
              sectionName="rightSection"
              targetSectionName="rightSection"
              direction="top"
              currentPageName={currentPageDisplayName}
              currentPosition={rightPosition}
            />
          )}
        {isInSection &&
          isEditMode &&
          !isResizeActive &&
          (rightPosition === SECTION_POSITION.TOP ||
            rightPosition === SECTION_POSITION.CENTER) && (
            <ChangeVerticalLayoutBar
              sectionName="rightSection"
              targetSectionName="rightSection"
              direction="bottom"
              currentPageName={currentPageDisplayName}
              currentPosition={rightPosition}
            />
          )}
        <div
          css={[containerWrapperStyle, applyNoBottomPaddingStyle(showFoldIcon)]}
        >
          {componentNode && animationComplete ? (
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
            <div css={applySideBarWrapperStyle("right")}>
              <NextIcon
                css={sideBarIconStyle}
                onClick={handleOnClickFoldIcon}
              />
            </div>
          )}
        </div>
        {isEditMode && animationComplete && (
          <div
            css={resizeHorizontalBarWrapperStyle}
            onMouseDown={handleClickMoveBar}
          >
            <div css={resizeHorizontalBarStyle} />
          </div>
        )}
        {isResizeActive && (
          <div css={horizontalWidthTipsStyle("left")}>
            {panelWidth.toFixed(0)}
            {canvasSize === "fixed" ? "px" : "%"}
          </div>
        )}
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

      <AnimatePresence
        onExitComplete={() => {
          setAnimationComplete(true)
        }}
      >
        {isEditMode && isFold && (
          <motion.div
            css={disabledHorizontalBarWrapperStyle}
            initial={{ right: rightWidth, position: "absolute" }}
            animate={{ right: 34, position: "absolute" }}
            exit={{ right: leftWidth - 8, position: "absolute" }}
            transition={{ duration: 0.3 }}
            onAnimationStart={() => {
              setAnimationComplete(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
RenderRightSection.displayName = "RenderRightSection"
