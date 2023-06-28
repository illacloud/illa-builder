import { AnimatePresence, motion } from "framer-motion"
import { FC, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { NextIcon, PreviousIcon } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { RenderComponentCanvasContainer } from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { RenderModalCanvasContainer } from "@/page/App/components/DotPanel/components/Canvas/renderModalCanvasContainer"
import {
  BASIC_CANVAS_PADDING,
  UNIT_HEIGHT,
} from "@/page/App/components/DotPanel/constant/canvas"
import {
  BODY_MIN_HEIGHT,
  BODY_MIN_WIDTH,
  FOOTER_MIN_HEIGHT,
  HEADER_MIN_HEIGHT,
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
} from "@/page/App/components/DotPanel/constant/canvas"
import { getCurrentDisplayName } from "@/page/App/components/DotPanel/hooks/sectionUtils"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { SECTION_POSITION } from "@/redux/currentApp/editor/components/componentsState"
import {
  getExecutionResult,
  getExecutionWidgetLayoutInfo,
} from "@/redux/currentApp/executionTree/executionSelector"
import { trackInEditor } from "@/utils/mixpanelHelper"
import {
  ChangeHorizontalLayoutBar,
  ChangeVerticalLayoutBar,
} from "./changeLayoutBar"
import {
  RenderFooterSectionProps,
  RenderHeaderSectionProps,
  RenderLeftSectionProps,
  RenderModalSectionProps,
  RenderRightSectionProps,
  RenderSectionProps,
} from "./interface"
import {
  applyFooterSectionWrapperStyle,
  applyHeaderSectionWrapperStyle,
  applyLeftAnimationWrapperStyle,
  applyLeftSectionWrapperStyle,
  applyNoBottomPaddingStyle,
  applyRightAnimationWrapperStyle,
  applyRightSectionWrapperStyle,
  applySideBarWrapperStyle,
  bodySectionWrapperStyle,
  containerWrapperStyle,
  disabledHorizontalBarWrapperStyle,
  footerHeightTipsStyle,
  headerHeightTipsStyle,
  leftOpenFoldPositionStyle,
  leftWidthTipsStyle,
  modalWrapperStyle,
  openFoldWrapperStyle,
  resizeHorizontalBarStyle,
  resizeHorizontalBarWrapperStyle,
  resizeVerticalBarStyle,
  resizeVerticalBarWrapperStyle,
  rightOpenFoldPositionStyle,
  rightWidthTipsStyle,
  sideBarIconStyle,
} from "./style"

export const RenderSection: FC<RenderSectionProps> = (props) => {
  const { sectionNode, mode, columnNumber } = props
  const executionResult = useSelector(getExecutionResult)
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
    mode === "production",
    viewPath,
    currentViewIndex,
  )

  if (!sectionNodeProps) return null

  const componentNode = sectionNode.childrenNode.find(
    (node) => node.displayName === currentViewDisplayName,
  )
  return (
    <div css={bodySectionWrapperStyle}>
      <div css={containerWrapperStyle}>
        {componentNode && (
          <RenderComponentCanvasContainer
            displayName={componentNode.displayName}
            containerPadding={BASIC_CANVAS_PADDING}
            columnNumber={columnNumber}
            isRootCanvas
          />
        )}
      </div>
    </div>
  )
}

RenderSection.displayName = "RenderSection"

export const RenderHeaderSection: FC<RenderHeaderSectionProps> = (props) => {
  const {
    sectionNode,
    topHeight,
    offsetTop,
    mode,
    containerHeight,
    footerHeight,
    currentPageDisplayName,
    leftPosition,
    rightPosition,
    columnNumber,
  } = props
  const [isResizeActive, setIsResizeActive] = useState(false)
  const [heightPX, setHeightPX] = useState(topHeight)

  const dispatch = useDispatch()
  const executionResult = useSelector(getExecutionResult)
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
    mode === "production",
    viewPath,
    currentViewIndex,
  )

  const handleClickMoveBar = () => {
    setHeightPX(topHeight)
    setIsResizeActive(true)
  }

  useEffect(() => {
    const mouseMoveListener = (e: globalThis.MouseEvent) => {
      if (isResizeActive) {
        const { clientY } = e
        let currentPointPositionY = clientY - offsetTop
        let otherPanelHeightPX = footerHeight
        if (currentPointPositionY % UNIT_HEIGHT !== 0) {
          currentPointPositionY =
            Math.round(currentPointPositionY / UNIT_HEIGHT) * UNIT_HEIGHT
        }
        if (currentPointPositionY < HEADER_MIN_HEIGHT) {
          currentPointPositionY = HEADER_MIN_HEIGHT
        }
        if (
          containerHeight - currentPointPositionY - otherPanelHeightPX <
          BODY_MIN_HEIGHT
        ) {
          if (footerHeight !== 0) {
            otherPanelHeightPX =
              containerHeight - BODY_MIN_HEIGHT - currentPointPositionY
            if (otherPanelHeightPX <= FOOTER_MIN_HEIGHT) {
              otherPanelHeightPX = FOOTER_MIN_HEIGHT
            }
          }
          currentPointPositionY =
            containerHeight - BODY_MIN_HEIGHT - otherPanelHeightPX
        }
        setHeightPX(currentPointPositionY)
        dispatch(
          componentsActions.updateTargetPagePropsReducer({
            pageName: currentPageDisplayName,
            newProps: {
              topHeight: currentPointPositionY,
              bottomHeight: otherPanelHeightPX,
            },
          }),
        )
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
    containerHeight,
    currentPageDisplayName,
    dispatch,
    footerHeight,
    isResizeActive,
    offsetTop,
  ])
  const [isInSection, setIsInSection] = useState(false)

  const onMouseEnter = useCallback(() => {
    if (
      mode === "edit" &&
      !isResizeActive &&
      (leftPosition === SECTION_POSITION.TOP ||
        leftPosition === SECTION_POSITION.FULL ||
        rightPosition === SECTION_POSITION.TOP ||
        rightPosition === SECTION_POSITION.FULL)
    ) {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.HOVER, {
        element: "page_arrow",
      })
    }
    setIsInSection(true)
  }, [isResizeActive, leftPosition, mode, rightPosition])

  const onMouseLeave = useCallback(() => {
    setIsInSection(false)
  }, [])

  if (!sectionNodeProps) return null

  const componentNode = sectionNode.childrenNode.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  return (
    <div
      css={applyHeaderSectionWrapperStyle(`${topHeight}px`, "240px", "500px")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isInSection &&
        mode === "edit" &&
        !isResizeActive &&
        (leftPosition === SECTION_POSITION.TOP ||
          leftPosition === SECTION_POSITION.FULL) && (
          <ChangeHorizontalLayoutBar
            targetSectionName="leftSection"
            sectionName="headerSection"
            direction="left"
            currentPosition={leftPosition}
            currentPageName={currentPageDisplayName}
          />
        )}
      {isInSection &&
        mode === "edit" &&
        !isResizeActive &&
        (rightPosition === SECTION_POSITION.TOP ||
          rightPosition === SECTION_POSITION.FULL) && (
          <ChangeHorizontalLayoutBar
            targetSectionName="rightSection"
            sectionName="headerSection"
            direction="right"
            currentPosition={rightPosition}
            currentPageName={currentPageDisplayName}
          />
        )}
      <div css={containerWrapperStyle}>
        {componentNode && (
          <RenderComponentCanvasContainer
            displayName={componentNode.displayName}
            containerPadding={BASIC_CANVAS_PADDING}
            columnNumber={columnNumber}
            isRootCanvas
          />
        )}
      </div>
      {mode === "edit" && (
        <div
          css={resizeVerticalBarWrapperStyle}
          onMouseDown={handleClickMoveBar}
          draggable={false}
        >
          <div css={resizeVerticalBarStyle} draggable={false} />
        </div>
      )}
      {isResizeActive && (
        <div css={headerHeightTipsStyle}>{heightPX.toFixed(0)}px</div>
      )}
    </div>
  )
}
RenderHeaderSection.displayName = "RenderHeaderSection"

export const RenderFooterSection: FC<RenderFooterSectionProps> = (props) => {
  const {
    sectionNode,
    bottomHeight,
    containerHeight,
    offsetTop,
    mode,
    headerHeight,
    currentPageDisplayName,
    leftPosition,
    rightPosition,
    columnNumber,
  } = props
  const executionResult = useSelector(getExecutionResult)
  const [isResizeActive, setIsResizeActive] = useState(false)
  const [heightPX, setHeightPX] = useState(bottomHeight)
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
    mode === "production",
    viewPath,
    currentViewIndex,
  )

  const componentNode = sectionNode.childrenNode.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  const dispatch = useDispatch()

  const handleClickMoveBar = () => {
    setHeightPX(bottomHeight)
    setIsResizeActive(true)
  }

  useEffect(() => {
    const mouseMoveListener = (e: globalThis.MouseEvent) => {
      if (isResizeActive) {
        const { clientY } = e
        let currentPointPositionY = containerHeight - (clientY - offsetTop)
        let otherPanelHeightPX = headerHeight
        if (currentPointPositionY % UNIT_HEIGHT !== 0) {
          currentPointPositionY =
            Math.round(currentPointPositionY / UNIT_HEIGHT) * UNIT_HEIGHT
        }
        if (currentPointPositionY < FOOTER_MIN_HEIGHT) {
          currentPointPositionY = FOOTER_MIN_HEIGHT
        }
        if (
          containerHeight - currentPointPositionY - otherPanelHeightPX <
          BODY_MIN_HEIGHT
        ) {
          if (headerHeight !== 0) {
            otherPanelHeightPX =
              containerHeight - BODY_MIN_HEIGHT - currentPointPositionY
            if (otherPanelHeightPX <= HEADER_MIN_HEIGHT) {
              otherPanelHeightPX = HEADER_MIN_HEIGHT
            }
          }

          currentPointPositionY =
            containerHeight - BODY_MIN_HEIGHT - otherPanelHeightPX
        }
        setHeightPX(currentPointPositionY)
        dispatch(
          componentsActions.updateTargetPagePropsReducer({
            pageName: currentPageDisplayName,
            newProps: {
              bottomHeight: currentPointPositionY,
              topHeight: otherPanelHeightPX,
            },
          }),
        )
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
    containerHeight,
    currentPageDisplayName,
    dispatch,
    headerHeight,
    isResizeActive,
    offsetTop,
  ])

  const [isInSection, setIsInSection] = useState(false)

  const onMouseEnter = useCallback(() => {
    if (
      mode === "edit" &&
      !isResizeActive &&
      (leftPosition === SECTION_POSITION.BOTTOM ||
        leftPosition === SECTION_POSITION.FULL ||
        rightPosition === SECTION_POSITION.BOTTOM ||
        rightPosition === SECTION_POSITION.FULL)
    ) {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.HOVER, {
        element: "page_arrow",
      })
    }

    setIsInSection(true)
  }, [isResizeActive, leftPosition, mode, rightPosition])

  const onMouseLeave = useCallback(() => {
    setIsInSection(false)
  }, [])

  return (
    <div
      css={applyFooterSectionWrapperStyle(
        `${bottomHeight}px`,
        "240px",
        "500px",
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isInSection &&
        mode === "edit" &&
        !isResizeActive &&
        (leftPosition === SECTION_POSITION.BOTTOM ||
          leftPosition === SECTION_POSITION.FULL) && (
          <ChangeHorizontalLayoutBar
            targetSectionName="leftSection"
            sectionName="footerSection"
            direction="left"
            currentPosition={leftPosition}
            currentPageName={currentPageDisplayName}
          />
        )}
      {isInSection &&
        mode === "edit" &&
        !isResizeActive &&
        (rightPosition === SECTION_POSITION.BOTTOM ||
          rightPosition === SECTION_POSITION.FULL) && (
          <ChangeHorizontalLayoutBar
            targetSectionName="rightSection"
            sectionName="footerSection"
            direction="right"
            currentPosition={rightPosition}
            currentPageName={currentPageDisplayName}
          />
        )}
      <div css={containerWrapperStyle}>
        {componentNode && (
          <RenderComponentCanvasContainer
            displayName={componentNode.displayName}
            containerPadding={BASIC_CANVAS_PADDING}
            columnNumber={columnNumber}
            isRootCanvas
          />
        )}
      </div>
      {mode === "edit" && (
        <div
          css={resizeVerticalBarWrapperStyle}
          onMouseDown={handleClickMoveBar}
          draggable={false}
        >
          <div css={resizeVerticalBarStyle} draggable={false} />
        </div>
      )}
      {isResizeActive && (
        <div css={footerHeightTipsStyle}>{heightPX.toFixed(0)}px</div>
      )}
    </div>
  )
}
RenderFooterSection.displayName = "RenderHeaderSection"

export const RenderLeftSection: FC<RenderLeftSectionProps> = (props) => {
  const {
    sectionNode,
    offsetLeft,
    containerWidth,
    mode,
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
    mode === "production",
    viewPath,
    currentViewIndex,
  )
  const [isInSection, setIsInSection] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(true)
  const [isResizeActive, setIsResizeActive] = useState(false)
  const [presetWidth, setPresetWidth] = useState(0)

  const componentNode = sectionNode.childrenNode.find(
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
      mode === "edit" &&
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
  }, [isResizeActive, leftPosition, mode])

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
      <div css={applyLeftAnimationWrapperStyle(isFold)}>
        {isInSection &&
          mode === "edit" &&
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
          mode === "edit" &&
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
          {componentNode && animationComplete && (
            <RenderComponentCanvasContainer
              displayName={componentNode.displayName}
              containerPadding={BASIC_CANVAS_PADDING}
              columnNumber={columnNumber}
              isRootCanvas
            />
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

        {mode === "edit" && animationComplete && (
          <div
            css={resizeHorizontalBarWrapperStyle}
            onMouseDown={handleClickMoveBar}
          >
            <div css={resizeHorizontalBarStyle} />
          </div>
        )}
        {isResizeActive && (
          <div css={leftWidthTipsStyle}>
            {presetWidth.toFixed(0)}
            {canvasSize === "fixed" ? "px" : "%"}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isFold && (
          <motion.div
            css={[openFoldWrapperStyle, leftOpenFoldPositionStyle]}
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
        {mode === "edit" && isFold && (
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

export const RenderRightSection: FC<RenderRightSectionProps> = (props) => {
  const {
    sectionNode,
    offsetLeft,
    containerWidth,
    mode,
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
    mode === "production",
    viewPath,
    currentViewIndex,
  )

  const componentNode = sectionNode.childrenNode.find(
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
      mode === "edit" &&
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
  }, [isResizeActive, mode, rightPosition])

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
      <div css={applyRightAnimationWrapperStyle(isFold)}>
        {isInSection &&
          mode === "edit" &&
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
          mode === "edit" &&
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
          {componentNode && animationComplete && (
            <RenderComponentCanvasContainer
              displayName={componentNode.displayName}
              containerPadding={BASIC_CANVAS_PADDING}
              columnNumber={columnNumber}
              isRootCanvas
            />
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
        {mode === "edit" && animationComplete && (
          <div
            css={resizeHorizontalBarWrapperStyle}
            onMouseDown={handleClickMoveBar}
          >
            <div css={resizeHorizontalBarStyle} />
          </div>
        )}
        {isResizeActive && (
          <div css={rightWidthTipsStyle}>
            {panelWidth.toFixed(0)}
            {canvasSize === "fixed" ? "px" : "%"}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isFold && (
          <motion.div
            css={[openFoldWrapperStyle, rightOpenFoldPositionStyle]}
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
        {mode === "edit" && isFold && (
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

export const RenderModalSection: FC<RenderModalSectionProps> = (props) => {
  const { sectionNode, columnNumber } = props
  const layoutInfos = useSelector(getExecutionWidgetLayoutInfo)
  const executionResult = useSelector(getExecutionResult)

  if (
    !Array.isArray(sectionNode.childrenNode) ||
    sectionNode.childrenNode.length === 0
  )
    return null

  const currentLayoutInfo = layoutInfos[sectionNode.displayName]

  const currentModalDisplayName = currentLayoutInfo.childrenNode?.find(
    (childName) => {
      const childNode = executionResult[childName]
      return childNode?.isVisible
    },
  )

  if (!currentModalDisplayName) return null

  return (
    <div css={modalWrapperStyle}>
      <RenderModalCanvasContainer
        displayName={sectionNode.displayName}
        containerPadding={BASIC_CANVAS_PADDING}
        columnNumber={columnNumber}
      />
    </div>
  )
}

RenderModalSection.displayName = "RenderModalSection"
