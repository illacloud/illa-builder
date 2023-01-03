import { AnimatePresence, motion } from "framer-motion"
import {
  FC,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import useMeasure from "react-use-measure"
import { NextIcon, PreIcon } from "@illa-design/react"
import { ScaleSquareOnlyHasResize } from "@/page/App/components/ScaleSquare"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  ComponentNode,
  SECTION_POSITION,
} from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import {
  BASIC_BLOCK_COLUMNS,
  LEFT_OR_RIGHT_DEFAULT_COLUMNS,
} from "@/utils/generators/generatePageOrSectionConfig"
import {
  ChangeLayoutBottomBar,
  ChangeLayoutLeftBar,
  ChangeLayoutRightBar,
  ChangeLayoutTopBar,
} from "./changeLayoutBar"
import {
  RenderFooterSectionProps,
  RenderHeaderSectionProps,
  RenderLeftSectionProps,
  RenderModalSectionProps,
  RenderRightSectionProps,
  RenderSectionProps,
} from "./interface"
import { RenderComponentCanvas, UNIT_HEIGHT } from "./renderComponentCanvas"
import {
  applyContainerWrapperStyle,
  applyFooterSectionWrapperStyle,
  applyHeaderSectionWrapperStyle,
  applyLeftAnimationWrapperStyle,
  applyLeftSectionWrapperStyle,
  applyModalWrapperStyle,
  applyNoBottomPaddingStyle,
  applyRightAnimationWrapperStyle,
  applyRightSectionWrapperStyle,
  applySideBarWrapperStyle,
  disabledHorizontalBarWrapperStyle,
  footerHeightTipsStyle,
  headerHeightTipsStyle,
  leftOpenFoldPositionStyle,
  leftWidthTipsStyle,
  maskStyle,
  openFoldWrapperStyle,
  resizeHorizontalBarStyle,
  resizeHorizontalBarWrapperStyle,
  resizeVerticalBarStyle,
  resizeVerticalBarWrapperStyle,
  rightOpenFoldPositionStyle,
  rightWidthTipsStyle,
  sideBarIconStyle,
} from "./style"

export const HEADER_MIN_HEIGHT = 40
export const FOOTER_MIN_HEIGHT = 40
export const BODY_MIN_HEIGHT = 40
export const LEFT_MIN_WIDTH = 80
export const RIGHT_MIN_WIDTH = 80
export const BODY_MIN_WIDTH = 80

export const DEFAULT_PERCENT_WIDTH = {
  LEFT: 20,
  RIGHT: 20,
  CANVAS: 100,
}

export const DEFAULT_PX_WIDTH = {
  LEFT: 240,
  RIGHT: 240,
  CANVAS: 1440,
}

export const RenderSection = forwardRef<HTMLDivElement, RenderSectionProps>(
  (props, ref) => {
    const { sectionNode, mode, columns } = props
    const executionResult = useSelector(getExecutionResult)
    const sectionNodeProps = executionResult[sectionNode.displayName] || {}
    const [containerBoundRef, containerBound] = useMeasure()
    const containerRef = useRef<HTMLDivElement>(
      null,
    ) as MutableRefObject<HTMLDivElement | null>
    const {
      viewSortedKey,
      currentViewIndex,
      defaultViewKey,
      sectionViewConfigs,
    } = sectionNodeProps
    let { viewPath = "View1" } = useParams()
    const currentViewDisplayName = useMemo(() => {
      if (!Array.isArray(sectionViewConfigs) || !Array.isArray(viewSortedKey))
        return "View 1"
      const defaultedViewKey = viewSortedKey.includes(defaultViewKey)
        ? defaultViewKey
        : viewSortedKey[0]
      if (mode === "production") {
        const targetViewName = sectionViewConfigs.find(
          (config) => config.path === decodeURIComponent(viewPath),
        )
        return targetViewName?.viewDisplayName || defaultedViewKey
      } else {
        return viewSortedKey[currentViewIndex] || defaultedViewKey
      }
    }, [
      currentViewIndex,
      defaultViewKey,
      mode,
      sectionViewConfigs,
      viewPath,
      viewSortedKey,
    ])
    if (!sectionNodeProps) return null

    const componentNode = sectionNode.childrenNode.find(
      (node) => node.displayName === currentViewDisplayName,
    )
    return (
      <div ref={ref}>
        <div
          css={applyContainerWrapperStyle(mode)}
          ref={(ele) => {
            containerBoundRef(ele)
            containerRef.current = ele
          }}
        >
          {componentNode && (
            <RenderComponentCanvas
              componentNode={componentNode}
              containerPadding={8}
              containerRef={containerRef}
              canResizeY
              minHeight={containerBound.height - 16}
              safeRowNumber={0}
              addedRowNumber={40}
              canAutoScroll
              blockColumns={columns ?? BASIC_BLOCK_COLUMNS}
              sectionName="BODY_SECTION"
            />
          )}
        </div>
      </div>
    )
  },
)

RenderSection.displayName = "RenderSection"

export const RenderHeaderSection = forwardRef<
  HTMLDivElement,
  RenderHeaderSectionProps
>((props, ref) => {
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
    columns,
  } = props
  const [isResizeActive, setIsResizeActive] = useState(false)
  const [heightPX, setHeightPX] = useState(topHeight)
  const [containerBoundRef, containerBound] = useMeasure()
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>

  const dispatch = useDispatch()
  const executionResult = useSelector(getExecutionResult)
  const sectionNodeProps = executionResult[sectionNode.displayName] || {}
  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
  } = sectionNodeProps
  let { viewPath = "View1" } = useParams()
  const currentViewDisplayName = useMemo(() => {
    if (!Array.isArray(sectionViewConfigs) || !Array.isArray(viewSortedKey))
      return "View 1"
    const defaultedViewKey = viewSortedKey.includes(defaultViewKey)
      ? defaultViewKey
      : viewSortedKey[0]
    if (mode === "production") {
      const targetViewName = sectionViewConfigs.find(
        (config) => config.path === decodeURIComponent(viewPath),
      )
      return targetViewName?.viewDisplayName || defaultedViewKey
    } else {
      return viewSortedKey[currentViewIndex] || defaultedViewKey
    }
  }, [
    currentViewIndex,
    defaultViewKey,
    mode,
    sectionViewConfigs,
    viewPath,
    viewSortedKey,
  ])

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
    setIsInSection(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsInSection(false)
  }, [])

  const handleUpdateLayout = useCallback(
    (sectionName: string, direction?: "top" | "bottom" | "left" | "right") => {
      if (sectionName === "leftSection") {
        switch (leftPosition) {
          case SECTION_POSITION.TOP: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  leftPosition: SECTION_POSITION.CENTER,
                },
              }),
            )
            break
          }
          case SECTION_POSITION.FULL: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  leftPosition: SECTION_POSITION.BOTTOM,
                },
              }),
            )
            break
          }
        }
      }

      if (sectionName === "rightSection") {
        switch (rightPosition) {
          case SECTION_POSITION.TOP: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  rightPosition: SECTION_POSITION.CENTER,
                },
              }),
            )
            break
          }
          case SECTION_POSITION.FULL: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  rightPosition: SECTION_POSITION.BOTTOM,
                },
              }),
            )
            break
          }
        }
      }
    },
    [currentPageDisplayName, dispatch, leftPosition, rightPosition],
  )
  if (!sectionNodeProps) return null

  const componentNode = sectionNode.childrenNode.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  return (
    <div
      css={applyHeaderSectionWrapperStyle(`${topHeight}px`, "240px", "500px")}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isInSection &&
        mode === "edit" &&
        !isResizeActive &&
        (leftPosition === SECTION_POSITION.TOP ||
          leftPosition === SECTION_POSITION.FULL) && (
          <ChangeLayoutLeftBar
            sectionName="leftSection"
            direction="left"
            changeAction={handleUpdateLayout}
          />
        )}
      {isInSection &&
        mode === "edit" &&
        !isResizeActive &&
        (rightPosition === SECTION_POSITION.TOP ||
          rightPosition === SECTION_POSITION.FULL) && (
          <ChangeLayoutRightBar
            sectionName="rightSection"
            direction="right"
            changeAction={handleUpdateLayout}
          />
        )}
      <div
        css={applyContainerWrapperStyle(mode)}
        ref={(ele) => {
          containerBoundRef(ele)
          containerRef.current = ele
        }}
      >
        {componentNode && (
          <RenderComponentCanvas
            componentNode={componentNode}
            containerPadding={8}
            containerRef={containerRef}
            canResizeY
            minHeight={containerBound.height - 16}
            safeRowNumber={0}
            addedRowNumber={5}
            blockColumns={columns ?? BASIC_BLOCK_COLUMNS}
            sectionName="HEADER_SECTION"
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
})
RenderHeaderSection.displayName = "RenderHeaderSection"

export const RenderFooterSection = forwardRef<
  HTMLDivElement,
  RenderFooterSectionProps
>((props, ref) => {
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
    columns,
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
  let { viewPath = "View1" } = useParams()
  const currentViewDisplayName = useMemo(() => {
    if (!Array.isArray(sectionViewConfigs) || !Array.isArray(viewSortedKey))
      return "View 1"
    const defaultedViewKey = viewSortedKey.includes(defaultViewKey)
      ? defaultViewKey
      : viewSortedKey[0]
    if (mode === "production") {
      const targetViewName = sectionViewConfigs.find(
        (config) => config.path === decodeURIComponent(viewPath),
      )
      return targetViewName?.viewDisplayName || defaultedViewKey
    } else {
      return viewSortedKey[currentViewIndex] || defaultedViewKey
    }
  }, [
    currentViewIndex,
    defaultViewKey,
    mode,
    sectionViewConfigs,
    viewPath,
    viewSortedKey,
  ])

  const componentNode = sectionNode.childrenNode.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  const [containerBoundRef, containerBound] = useMeasure()
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>

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
    setIsInSection(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsInSection(false)
  }, [])

  const handleUpdateLayout = useCallback(
    (sectionName: string, direction?: "top" | "bottom" | "left" | "right") => {
      if (sectionName === "leftSection") {
        switch (leftPosition) {
          case SECTION_POSITION.BOTTOM: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  leftPosition: SECTION_POSITION.CENTER,
                },
              }),
            )
            break
          }
          case SECTION_POSITION.FULL: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  leftPosition: SECTION_POSITION.TOP,
                },
              }),
            )
            break
          }
        }
      }

      if (sectionName === "rightSection") {
        switch (rightPosition) {
          case SECTION_POSITION.BOTTOM: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  rightPosition: SECTION_POSITION.CENTER,
                },
              }),
            )
            break
          }
          case SECTION_POSITION.FULL: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  rightPosition: SECTION_POSITION.TOP,
                },
              }),
            )
            break
          }
        }
      }
    },
    [currentPageDisplayName, dispatch, leftPosition, rightPosition],
  )

  return (
    <div
      css={applyFooterSectionWrapperStyle(
        `${bottomHeight}px`,
        "240px",
        "500px",
      )}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isInSection &&
        mode === "edit" &&
        !isResizeActive &&
        (leftPosition === SECTION_POSITION.BOTTOM ||
          leftPosition === SECTION_POSITION.FULL) && (
          <ChangeLayoutLeftBar
            sectionName="leftSection"
            direction="left"
            changeAction={handleUpdateLayout}
          />
        )}
      {isInSection &&
        mode === "edit" &&
        !isResizeActive &&
        (rightPosition === SECTION_POSITION.BOTTOM ||
          rightPosition === SECTION_POSITION.FULL) && (
          <ChangeLayoutRightBar
            sectionName="rightSection"
            direction="right"
            changeAction={handleUpdateLayout}
          />
        )}
      <div
        css={applyContainerWrapperStyle(mode)}
        ref={(ele) => {
          containerBoundRef(ele)
          containerRef.current = ele
        }}
      >
        {componentNode && (
          <RenderComponentCanvas
            componentNode={componentNode}
            containerPadding={8}
            containerRef={containerRef}
            canResizeY
            minHeight={containerBound.height - 16}
            safeRowNumber={0}
            addedRowNumber={5}
            blockColumns={columns ?? BASIC_BLOCK_COLUMNS}
            sectionName="FOOTER_SECTION"
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
})
RenderFooterSection.displayName = "RenderHeaderSection"

export const RenderLeftSection = forwardRef<
  HTMLDivElement,
  RenderLeftSectionProps
>((props, ref) => {
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
    columns,
  } = props

  const executionResult = useSelector(getExecutionResult)
  const sectionNodeProps = executionResult[sectionNode.displayName] || {}
  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
  } = sectionNodeProps
  let { viewPath = "View1" } = useParams()
  const currentViewDisplayName = useMemo(() => {
    if (!Array.isArray(sectionViewConfigs) || !Array.isArray(viewSortedKey))
      return "View 1"
    const defaultedViewKey = viewSortedKey.includes(defaultViewKey)
      ? defaultViewKey
      : viewSortedKey[0]
    if (mode === "production") {
      const targetViewName = sectionViewConfigs.find(
        (config) => config.path === decodeURIComponent(viewPath),
      )
      return targetViewName?.viewDisplayName || defaultedViewKey
    } else {
      return viewSortedKey[currentViewIndex] || defaultedViewKey
    }
  }, [
    currentViewIndex,
    defaultViewKey,
    mode,
    sectionViewConfigs,
    viewPath,
    viewSortedKey,
  ])
  const [isInSection, setIsInSection] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(true)
  const [isResizeActive, setIsResizeActive] = useState(false)
  const [presetWidth, setPresetWidth] = useState(0)

  const componentNode = sectionNode.childrenNode.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  const [containerBoundRef, containerBound] = useMeasure()
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>

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
      setIsResizeActive(false)
    }
    document.addEventListener("mousemove", mouseMoveListener)
    document.addEventListener("mouseup", mouseUpListener)
    return () => {
      document.removeEventListener("mousemove", mouseMoveListener)
      document.removeEventListener("mouseup", mouseUpListener)
    }
  }, [
    containerWidth,
    currentPageDisplayName,
    dispatch,
    isResizeActive,
    offsetLeft,
    rightWidth,
  ])

  const onMouseEnter = useCallback(() => {
    setIsInSection(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsInSection(false)
  }, [])

  const handleUpdateLayout = useCallback(
    (sectionName: string, direction?: "top" | "bottom" | "left" | "right") => {
      if (sectionName === "leftSection") {
        switch (leftPosition) {
          case SECTION_POSITION.TOP:
          case SECTION_POSITION.BOTTOM: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  leftPosition: SECTION_POSITION.FULL,
                },
              }),
            )
            break
          }
          case SECTION_POSITION.CENTER: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  leftPosition:
                    direction === "top"
                      ? SECTION_POSITION.TOP
                      : SECTION_POSITION.BOTTOM,
                },
              }),
            )
            break
          }
        }
      }
    },
    [currentPageDisplayName, dispatch, leftPosition],
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
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div css={applyLeftAnimationWrapperStyle(isFold)}>
        {isInSection &&
          mode === "edit" &&
          !isResizeActive &&
          (leftPosition === SECTION_POSITION.BOTTOM ||
            leftPosition === SECTION_POSITION.CENTER) && (
            <ChangeLayoutTopBar
              sectionName="leftSection"
              direction="top"
              changeAction={handleUpdateLayout}
            />
          )}
        {isInSection &&
          mode === "edit" &&
          !isResizeActive &&
          (leftPosition === SECTION_POSITION.TOP ||
            leftPosition === SECTION_POSITION.CENTER) && (
            <ChangeLayoutBottomBar
              sectionName="leftSection"
              direction="bottom"
              changeAction={handleUpdateLayout}
            />
          )}

        <div
          css={[
            applyContainerWrapperStyle(mode),
            applyNoBottomPaddingStyle(showFoldIcon),
          ]}
          ref={(ele) => {
            containerBoundRef(ele)
            containerRef.current = ele
          }}
        >
          {componentNode && animationComplete && (
            <RenderComponentCanvas
              componentNode={componentNode}
              containerPadding={8}
              containerRef={containerRef}
              canResizeY
              minHeight={
                showFoldIcon
                  ? containerBound.height - 8 - 32
                  : containerBound.height - 16
              }
              safeRowNumber={0}
              blockColumns={columns ?? LEFT_OR_RIGHT_DEFAULT_COLUMNS}
              addedRowNumber={40}
              canAutoScroll
              sectionName="LEFT_SECTION"
            />
          )}
          {showFoldIcon && (
            <div css={applySideBarWrapperStyle("left")}>
              <PreIcon css={sideBarIconStyle} onClick={handleOnClickFoldIcon} />
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
})
RenderLeftSection.displayName = "RenderLeftSection"

export const RenderRightSection = forwardRef<
  HTMLDivElement,
  RenderRightSectionProps
>((props, ref) => {
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
    columns,
  } = props

  const executionResult = useSelector(getExecutionResult)
  const sectionNodeProps = executionResult[sectionNode.displayName] || {}
  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
  } = sectionNodeProps
  let { viewPath = "View1" } = useParams()
  const currentViewDisplayName = useMemo(() => {
    if (!Array.isArray(sectionViewConfigs) || !Array.isArray(viewSortedKey))
      return "View 1"
    const defaultedViewKey = viewSortedKey.includes(defaultViewKey)
      ? defaultViewKey
      : viewSortedKey[0]
    if (mode === "production") {
      const targetViewName = sectionViewConfigs.find(
        (config) => config.path === decodeURIComponent(viewPath),
      )
      return targetViewName?.viewDisplayName || defaultedViewKey
    } else {
      return viewSortedKey[currentViewIndex] || defaultedViewKey
    }
  }, [
    currentViewIndex,
    defaultViewKey,
    mode,
    sectionViewConfigs,
    viewPath,
    viewSortedKey,
  ])

  const componentNode = sectionNode.childrenNode.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  const [containerBoundRef, containerBound] = useMeasure()
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>

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
      setIsResizeActive(false)
    }
    document.addEventListener("mousemove", mouseMoveListener)
    document.addEventListener("mouseup", mouseUpListener)
    return () => {
      document.removeEventListener("mousemove", mouseMoveListener)
      document.removeEventListener("mouseup", mouseUpListener)
    }
  }, [
    containerWidth,
    currentPageDisplayName,
    dispatch,
    isResizeActive,
    leftWidth,
    offsetLeft,
  ])

  const onMouseEnter = useCallback(() => {
    setIsInSection(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsInSection(false)
  }, [])

  const handleUpdateLayout = useCallback(
    (sectionName: string, direction?: "top" | "bottom" | "left" | "right") => {
      if (sectionName === "rightSection") {
        switch (rightPosition) {
          case SECTION_POSITION.TOP:
          case SECTION_POSITION.BOTTOM: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  rightPosition: SECTION_POSITION.FULL,
                },
              }),
            )
            break
          }
          case SECTION_POSITION.CENTER: {
            dispatch(
              componentsActions.updateTargetPagePropsReducer({
                pageName: currentPageDisplayName,
                newProps: {
                  layout: "Custom",
                  rightPosition:
                    direction === "top"
                      ? SECTION_POSITION.TOP
                      : SECTION_POSITION.BOTTOM,
                },
              }),
            )
            break
          }
        }
      }
    },
    [currentPageDisplayName, dispatch, rightPosition],
  )

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
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div css={applyRightAnimationWrapperStyle(isFold)}>
        {isInSection &&
          mode === "edit" &&
          !isResizeActive &&
          (rightPosition === SECTION_POSITION.BOTTOM ||
            rightPosition === SECTION_POSITION.CENTER) && (
            <ChangeLayoutTopBar
              sectionName="rightSection"
              direction="top"
              changeAction={handleUpdateLayout}
            />
          )}
        {isInSection &&
          mode === "edit" &&
          !isResizeActive &&
          (rightPosition === SECTION_POSITION.TOP ||
            rightPosition === SECTION_POSITION.CENTER) && (
            <ChangeLayoutBottomBar
              sectionName="rightSection"
              direction="bottom"
              changeAction={handleUpdateLayout}
            />
          )}
        <div
          css={[
            applyContainerWrapperStyle(mode),
            applyNoBottomPaddingStyle(showFoldIcon),
          ]}
          ref={(ele) => {
            containerBoundRef(ele)
            containerRef.current = ele
          }}
        >
          {componentNode && animationComplete && (
            <RenderComponentCanvas
              componentNode={componentNode}
              containerPadding={8}
              containerRef={containerRef}
              canResizeY
              minHeight={
                showFoldIcon
                  ? containerBound.height - 8 - 32
                  : containerBound.height - 16
              }
              safeRowNumber={0}
              blockColumns={columns ?? LEFT_OR_RIGHT_DEFAULT_COLUMNS}
              addedRowNumber={40}
              canAutoScroll
              sectionName="RIGHT_SECTION"
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
})
RenderRightSection.displayName = "RenderRightSection"

export const RenderModalSection: FC<RenderModalSectionProps> = (props) => {
  const { sectionNode, mode } = props
  const executionResult = useSelector(getExecutionResult)
  const dispatch = useDispatch()
  const [containerBoundRef, containerBound] = useMeasure()
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>

  const handleOnClickMask = useCallback(
    (displayName: string) => {
      dispatch(
        executionActions.updateModalDisplayReducer({
          display: false,
          displayName,
        }),
      )
    },
    [dispatch],
  )

  if (
    !Array.isArray(sectionNode.childrenNode) ||
    sectionNode.childrenNode.length === 0
  )
    return null

  let currentComponentNode: ComponentNode | undefined =
    sectionNode.childrenNode.find((node) => {
      const realProps = executionResult[node.displayName]
      return realProps.isVisible
    })

  if (!currentComponentNode) return null
  const displayName = currentComponentNode.displayName

  const currentComponentNodeProps = executionResult[displayName] || {}

  return (
    <div
      css={maskStyle}
      onClick={() => {
        if (currentComponentNodeProps?.clickMaskClose) {
          handleOnClickMask(displayName)
        }
      }}
    >
      <div
        css={applyModalWrapperStyle(mode)}
        ref={(ele) => {
          containerBoundRef(ele)
          containerRef.current = ele
        }}
      >
        {currentComponentNode && (
          <ScaleSquareOnlyHasResize
            key={currentComponentNode.displayName}
            componentNode={currentComponentNode}
            h={currentComponentNode.h * currentComponentNode.unitH}
            w={currentComponentNode.w * currentComponentNode.unitW}
            x={currentComponentNode.x}
            y={currentComponentNode.y}
            unitW={currentComponentNode.unitW}
            unitH={UNIT_HEIGHT}
            containerHeight={containerBound.height}
            containerPadding={8}
            childrenNode={currentComponentNode.childrenNode}
            collisionEffect={new Map()}
            blockColumns={6}
          />
        )}
      </div>
    </div>
  )
}

RenderModalSection.displayName = "RenderModalSection"
