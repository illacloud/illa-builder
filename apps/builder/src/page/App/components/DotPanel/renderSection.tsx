import {
  useEffect,
  useRef,
  forwardRef,
  MutableRefObject,
  useState,
  useCallback,
  useMemo,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  RenderFooterSectionProps,
  RenderHeaderSectionProps,
  RenderLeftSectionProps,
  RenderRightSectionProps,
  RenderSectionProps,
} from "./interface"
import {
  applyFooterSectionWrapperStyle,
  applyHeaderSectionWrapperStyle,
  applyLeftSectionWrapperStyle,
  applyRightSectionWrapperStyle,
  applyContainerWrapperStyle,
  resizeHorizontalBarStyle,
  resizeHorizontalBarWrapperStyle,
  resizeVerticalBarStyle,
  resizeVerticalBarWrapperStyle,
  applySideBarWrapperStyle,
  sideBarIconStyle,
  openFoldWrapperStyle,
  leftOpenFoldPositionStyle,
  applyNoBottomPaddingStyle,
  rightOpenFoldPositionStyle,
  disabledHorizontalBarWrapperStyle,
  applyLeftAnimationWrapperStyle,
  applyRightAnimationWrapperStyle,
} from "./style"
import { RenderComponentCanvas } from "./renderComponentCanvas"
import useMeasure from "react-use-measure"
import {
  ChangeLayoutBottomBar,
  ChangeLayoutLeftBar,
  ChangeLayoutRightBar,
  ChangeLayoutTopBar,
} from "./changeLayoutBar"
import { SECTION_POSITION } from "@/redux/currentApp/editor/components/componentsState"
import { PreIcon, NextIcon } from "@illa-design/react"
import { motion, AnimatePresence } from "framer-motion"
import { getExecutionResult } from "../../../../redux/currentApp/executionTree/executionSelector"
import { useParams } from "react-router-dom"

export const HEADER_MIN_HEIGHT = 96
export const FOOTER_MIN_HEIGHT = 96
export const LEFT_MIN_WIDTH = 240
export const RIGHT_MIN_WIDTH = 240
export const BODY_MIN_WIDTH = 384
export const BODY_MIN_HEIGHT = 512

export const RenderSection = forwardRef<HTMLDivElement, RenderSectionProps>(
  (props, ref) => {
    const { sectionNode, mode } = props
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
  } = props
  const isActive = useRef<boolean>(false)
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
  useEffect(() => {
    const mouseMoveListener = (e: globalThis.MouseEvent) => {
      if (isActive.current) {
        const { clientY } = e
        let currentPointPositionY = clientY - offsetTop
        let otherPanelHeightPX = footerHeight
        if (currentPointPositionY % 8 !== 0) {
          currentPointPositionY = Math.round(currentPointPositionY / 8) * 8
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
      isActive.current = false
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

  const handleClickMoveBar = () => {
    isActive.current = true
  }

  return (
    <div
      css={applyHeaderSectionWrapperStyle(`${topHeight}px`, "240px", "500px")}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isInSection &&
        mode === "edit" &&
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

  const isActive = useRef<boolean>(false)

  const dispatch = useDispatch()

  const handleClickMoveBar = () => {
    isActive.current = true
  }

  useEffect(() => {
    const mouseMoveListener = (e: globalThis.MouseEvent) => {
      if (isActive.current) {
        const { clientY } = e
        let currentPointPositionY = containerHeight - (clientY - offsetTop)
        let otherPanelHeightPX = headerHeight
        if (currentPointPositionY % 8 !== 0) {
          currentPointPositionY = Math.round(currentPointPositionY / 8) * 8
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
      isActive.current = false
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
  const isActive = useRef<boolean>(false)

  const componentNode = sectionNode.childrenNode.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  const [containerBoundRef, containerBound] = useMeasure()
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>

  const dispatch = useDispatch()

  const handleClickMoveBar = () => {
    isActive.current = true
  }

  useEffect(() => {
    const mouseMoveListener = (e: globalThis.MouseEvent) => {
      if (isActive.current) {
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
        const presetWidth = (currentPointPositionX / containerWidth) * 100
        const otherPanelWidth = (otherPanelWidthPX / containerWidth) * 100
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

    const mouseUpListener = () => {
      isActive.current = false
    }
    document.addEventListener("mousemove", mouseMoveListener)
    document.addEventListener("mouseup", mouseUpListener)
    return () => {
      document.removeEventListener("mousemove", mouseMoveListener)
      document.removeEventListener("mouseup", mouseUpListener)
    }
  }, [containerWidth, currentPageDisplayName, dispatch, offsetLeft, rightWidth])

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
              blockColumns={16}
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

  const isActive = useRef<boolean>(false)
  const [isInSection, setIsInSection] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(true)

  const dispatch = useDispatch()

  const handleClickMoveBar = () => {
    isActive.current = true
  }

  useEffect(() => {
    const mouseMoveListener = (e: globalThis.MouseEvent) => {
      if (isActive.current) {
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
        const presetWidth = (currentPointPositionX / containerWidth) * 100
        const otherPanelWidth = (otherPanelWidthPX / containerWidth) * 100

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

    const mouseUpListener = () => {
      isActive.current = false
    }
    document.addEventListener("mousemove", mouseMoveListener)
    document.addEventListener("mouseup", mouseUpListener)
    return () => {
      document.removeEventListener("mousemove", mouseMoveListener)
      document.removeEventListener("mouseup", mouseUpListener)
    }
  }, [containerWidth, currentPageDisplayName, dispatch, leftWidth, offsetLeft])

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
              blockColumns={16}
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
