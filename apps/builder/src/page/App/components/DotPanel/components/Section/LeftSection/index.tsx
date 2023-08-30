import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { NextIcon, PreviousIcon } from "@illa-design/react"
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
import { RenderLeftSectionProps } from "./interface"
import { applyLeftSectionWrapperStyle } from "./style"

export const RenderLeftSection: FC<RenderLeftSectionProps> = (props) => {
  const {
    sectionNode,
    offsetLeft,
    containerWidth,
    rightWidth,
    currentPageDisplayName,
    leftPosition,
    showFoldIcon,
    isFold,
    leftWidth,
    setIsLeftFold,
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
  const [isInSection, setIsInSection] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(true)
  const [isResizeActive, setIsResizeActive] = useState(false)
  const [presetWidth, setPresetWidth] = useState(0)

  const componentNode = sectionNode.childrenNode?.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  const dispatch = useDispatch()

  const handleClickMoveBar = () => {
    if (canvasSize === "fixed") {
      setPresetWidth(leftWidth)
    } else {
      const presetWidth = (leftWidth / containerWidth) * 100
      setPresetWidth(presetWidth)
    }
    setIsResizeActive(true)
  }

  useEffect(() => {
    const mouseMoveListener = (e: globalThis.MouseEvent) => {
      if (isResizeActive) {
        const { clientX } = e
        let currentPointPositionX = clientX - offsetLeft
        let otherPanelWidthPX = rightWidth
        if (currentPointPositionX < LEFT_MIN_WIDTH) {
          currentPointPositionX = LEFT_MIN_WIDTH
        }
        if (
          containerWidth - currentPointPositionX - otherPanelWidthPX <
          BODY_MIN_WIDTH
        ) {
          if (rightWidth !== 0) {
            otherPanelWidthPX =
              containerWidth - BODY_MIN_WIDTH - currentPointPositionX
            if (otherPanelWidthPX <= RIGHT_MIN_WIDTH) {
              otherPanelWidthPX = RIGHT_MIN_WIDTH
            }
          }

          currentPointPositionX =
            containerWidth - BODY_MIN_WIDTH - otherPanelWidthPX
        }
        if (canvasSize === "fixed") {
          setPresetWidth(currentPointPositionX)
          dispatch(
            componentsActions.updateTargetPagePropsReducer({
              pageName: currentPageDisplayName,
              newProps: {
                leftWidth: currentPointPositionX,
                rightWidth: otherPanelWidthPX,
              },
            }),
          )
        } else {
          const presetWidth = (currentPointPositionX / containerWidth) * 100
          const otherPanelWidth = (otherPanelWidthPX / containerWidth) * 100
          setPresetWidth(presetWidth)
          dispatch(
            componentsActions.updateTargetPagePropsReducer({
              pageName: currentPageDisplayName,
              newProps: {
                leftWidth: presetWidth,
                rightWidth: otherPanelWidth,
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
    offsetLeft,
    rightWidth,
  ])

  const onMouseEnter = useCallback(() => {
    if (
      isEditMode &&
      !isResizeActive &&
      (leftPosition === SECTION_POSITION.BOTTOM ||
        leftPosition === SECTION_POSITION.CENTER ||
        leftPosition === SECTION_POSITION.TOP)
    ) {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.HOVER, {
        element: "page_arrow",
      })
    }
    setIsInSection(true)
  }, [isEditMode, isResizeActive, leftPosition])

  const onMouseLeave = useCallback(() => {
    setIsInSection(false)
  }, [])

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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div css={applyHorizontalAnimationWrapperStyle(isFold, "left")}>
        {isInSection &&
          isEditMode &&
          !isResizeActive &&
          (leftPosition === SECTION_POSITION.BOTTOM ||
            leftPosition === SECTION_POSITION.CENTER) && (
            <ChangeVerticalLayoutBar
              sectionName="leftSection"
              targetSectionName="leftSection"
              direction="top"
              currentPageName={currentPageDisplayName}
              currentPosition={leftPosition}
            />
          )}
        {isInSection &&
          isEditMode &&
          !isResizeActive &&
          (leftPosition === SECTION_POSITION.TOP ||
            leftPosition === SECTION_POSITION.CENTER) && (
            <ChangeVerticalLayoutBar
              sectionName="leftSection"
              targetSectionName="leftSection"
              direction="bottom"
              currentPageName={currentPageDisplayName}
              currentPosition={leftPosition}
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
            <div css={applySideBarWrapperStyle("left")}>
              <PreviousIcon
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
          <div css={horizontalWidthTipsStyle("right")}>
            {presetWidth.toFixed(0)}
            {canvasSize === "fixed" ? "px" : "%"}
          </div>
        )}
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

      <AnimatePresence
        onExitComplete={() => {
          setAnimationComplete(true)
        }}
      >
        {isEditMode && isFold && (
          <motion.div
            css={disabledHorizontalBarWrapperStyle}
            initial={{ left: leftWidth, position: "absolute" }}
            animate={{ left: 34, position: "absolute" }}
            exit={{ left: leftWidth - 8, position: "absolute" }}
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
RenderLeftSection.displayName = "RenderLeftSection"
