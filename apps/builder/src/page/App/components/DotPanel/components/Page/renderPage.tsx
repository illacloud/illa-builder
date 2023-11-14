import { SECTION_POSITION } from "@illa-public/public-types"
import {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import {
  DEFAULT_ASIDE_COLUMNS_NUMBER,
  DEFAULT_BODY_COLUMNS_NUMBER,
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
} from "@/page/App/components/DotPanel/constant/canvas"
import { getCanvasShape, getIllaMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getCurrentPageExecutionResult,
  getPageLoadingActions,
} from "@/redux/currentApp/executionTree/executionSelector"
import store from "@/store"
import {
  IExecutionActions,
  runActionWithDelay,
  runActionWithExecutionResult,
} from "@/utils/action/runAction"
import { PageLoading } from "../PageLoading/pageLoading"
import {
  RenderBodySection,
  RenderFooterSection,
  RenderHeaderSection,
  RenderLeftSection,
  RenderModalSection,
  RenderRightSection,
} from "../Section"
import { RenderPageProps } from "./interface"
import {
  applyCanvasContainerWrapperStyle,
  pageContainerWrapperStyle,
} from "./style"

const getLeftAndRightWidth = (
  canvasSize: "auto" | "fixed",
  width: number,
  containerWidth: number,
) => {
  if (canvasSize === "fixed") {
    return width
  } else {
    return (width / 100) * containerWidth
  }
}

export const RenderPage: FC<RenderPageProps> = (props) => {
  const { currentPageDisplayName } = props
  const containerWrapperRef = useRef<HTMLDivElement>(null)
  const [containerRef, bounds] = useMeasure()
  const canvasShape = useSelector(getCanvasShape)
  const mode = useSelector(getIllaMode)
  const dispatch = useDispatch()
  const pageNode = useSelector(getCurrentPageExecutionResult)

  const {
    canvasSize,
    canvasWidth,
    hasLeft,
    hasRight,
    hasFooter,
    hasHeader,
    leftPosition,
    rightPosition,
    leftWidth,
    rightWidth,
    topHeight,
    bottomHeight,
    showLeftFoldIcon,
    showRightFoldIcon,
    leftColumns,
    rightColumns,
    headerColumns,
    footerColumns,
    bodyColumns,
  } = pageNode

  const [isLeftFold, setIsLeftFold] = useState(false)
  const [isRightFold, setIsRightFold] = useState(false)

  useLayoutEffect(() => {
    if (
      canvasShape.canvasHeight !== bounds.height ||
      canvasShape.canvasWidth !== bounds.width
    ) {
      dispatch(
        configActions.updateCanvasShapeReducer({
          canvasHeight: bounds.height,
          canvasWidth: bounds.width,
        }),
      )
    }
  }, [
    bounds.height,
    bounds.width,
    canvasShape.canvasHeight,
    canvasShape.canvasWidth,
    dispatch,
  ])
  const realLeftWidth = useMemo(() => {
    const leftWidthPX = getLeftAndRightWidth(
      canvasSize,
      leftWidth,
      bounds.width,
    )
    return hasLeft
      ? leftWidthPX <= LEFT_MIN_WIDTH
        ? LEFT_MIN_WIDTH
        : leftWidthPX
      : 0
  }, [bounds.width, canvasSize, hasLeft, leftWidth])

  const realRightWidth = useMemo(() => {
    const rightWidthPX = getLeftAndRightWidth(
      canvasSize,
      rightWidth,
      bounds.width,
    )
    return hasRight
      ? rightWidthPX <= RIGHT_MIN_WIDTH
        ? RIGHT_MIN_WIDTH
        : rightWidthPX
      : 0
  }, [bounds.width, canvasSize, hasRight, rightWidth])

  const calcLeftWidth = useMemo(() => {
    const leftWidthPX = getLeftAndRightWidth(
      canvasSize,
      leftWidth,
      bounds.width,
    )
    return hasLeft
      ? isLeftFold
        ? 40
        : leftWidthPX <= LEFT_MIN_WIDTH
        ? LEFT_MIN_WIDTH
        : leftWidthPX
      : 0
  }, [bounds.width, canvasSize, hasLeft, isLeftFold, leftWidth])

  const calcRightWidth = useMemo(() => {
    const rightWidthPX = getLeftAndRightWidth(
      canvasSize,
      rightWidth,
      bounds.width,
    )
    return hasRight
      ? isRightFold
        ? 40
        : rightWidthPX <= RIGHT_MIN_WIDTH
        ? RIGHT_MIN_WIDTH
        : rightWidthPX
      : 0
  }, [bounds.width, canvasSize, hasRight, isRightFold, rightWidth])

  useLayoutEffect(() => {
    if (bounds.width <= 0) return
    let headerLeft = 0
    let headerWidth = bounds.width
    let leftTop = 0
    let leftHeight = bounds.height
    let rightTop = 0
    let rightHeight = bounds.height
    let footerLeft = 0
    let footerWidth = bounds.width
    let bodyWidth = bounds.width
    let bodyTop = 0
    let bodyLeft = 0
    let bodyHeight = bounds.height
    if (hasLeft) {
      bodyWidth -= calcLeftWidth
      bodyLeft = calcLeftWidth
      switch (leftPosition) {
        case SECTION_POSITION.TOP: {
          headerLeft = calcLeftWidth
          headerWidth -= calcLeftWidth
          leftHeight -= bottomHeight
          break
        }
        case SECTION_POSITION.FULL: {
          headerLeft = calcLeftWidth
          headerWidth -= calcLeftWidth
          footerLeft = calcLeftWidth
          footerWidth -= calcLeftWidth
          break
        }
        case SECTION_POSITION.BOTTOM: {
          footerLeft = calcLeftWidth
          footerWidth -= calcLeftWidth
          leftTop = topHeight
          leftHeight -= topHeight
          break
        }
        case SECTION_POSITION.CENTER: {
          leftTop = topHeight
          leftHeight = leftHeight - topHeight - bottomHeight
        }
      }
    }

    if (hasRight) {
      bodyWidth -= calcRightWidth
      switch (rightPosition) {
        case SECTION_POSITION.TOP: {
          headerWidth -= calcRightWidth
          rightHeight -= bottomHeight
          break
        }
        case SECTION_POSITION.FULL: {
          headerWidth -= calcRightWidth
          footerWidth -= calcRightWidth
          break
        }
        case SECTION_POSITION.BOTTOM: {
          footerWidth -= calcRightWidth
          rightTop = topHeight
          rightHeight -= topHeight
          break
        }
        case SECTION_POSITION.CENTER: {
          rightTop = topHeight
          rightHeight = rightHeight - bottomHeight - topHeight
        }
      }
    }
    if (hasHeader) {
      bodyTop = topHeight
      bodyHeight -= topHeight
    }

    if (hasFooter) {
      bodyHeight -= bottomHeight
    }
    let containerWrapperStyle: CSSStyleDeclaration | undefined =
      containerWrapperRef.current?.style

    if (hasLeft && containerWrapperStyle) {
      containerWrapperStyle.setProperty(
        "--illa-canvas-left-height",
        `${leftHeight}px`,
      )
      containerWrapperStyle.setProperty(
        "--illa-canvas-left-top",
        `${leftTop}px`,
      )
    }
    if (hasRight && containerWrapperStyle) {
      containerWrapperStyle.setProperty(
        "--illa-canvas-right-height",
        `${rightHeight}px`,
      )
      containerWrapperStyle.setProperty(
        "--illa-canvas-right-top",
        `${rightTop}px`,
      )
    }
    if (hasHeader && containerWrapperStyle) {
      containerWrapperStyle.setProperty(
        "--illa-canvas-header-width",
        `${headerWidth}px`,
      )
      containerWrapperStyle.setProperty(
        "--illa-canvas-header-left",
        `${headerLeft}px`,
      )
    }
    if (hasFooter && containerWrapperStyle) {
      containerWrapperStyle.setProperty(
        "--illa-canvas-footer-width",
        `${footerWidth}px`,
      )
      containerWrapperStyle.setProperty(
        "--illa-canvas-footer-left",
        `${footerLeft}px`,
      )
    }

    if (containerWrapperStyle) {
      containerWrapperStyle.setProperty(
        "--illa-canvas-body-width",
        `${bodyWidth}px`,
      )
      containerWrapperStyle.setProperty(
        "--illa-canvas-body-left",
        `${bodyLeft}px`,
      )
      containerWrapperStyle.setProperty(
        "--illa-canvas-body-top",
        `${bodyTop}px`,
      )
      containerWrapperStyle.setProperty(
        "--illa-canvas-body-height",
        `${bodyHeight}px`,
      )
    }
  }, [
    bottomHeight,
    bounds,
    calcLeftWidth,
    calcRightWidth,
    canvasSize,
    hasFooter,
    hasHeader,
    hasLeft,
    hasRight,
    leftPosition,
    leftWidth,
    realLeftWidth,
    realRightWidth,
    rightPosition,
    rightWidth,
    topHeight,
  ])

  const [isPageLoading, setIsPageLoading] = useState(false)
  useEffect(() => {
    const abortController = new AbortController()
    const rootState = store.getState()
    const pageLoadingActions = getPageLoadingActions(rootState)
    const currentPageActions = pageLoadingActions.filter(
      (action) =>
        action.config?.advancedConfig.pages.includes(currentPageDisplayName),
    )
    const canShowPageActions = currentPageActions.filter(
      (action) => action?.config.advancedConfig.displayLoadingPage,
    )
    if (canShowPageActions.length > 0) {
      setIsPageLoading(true)
    }
    const requests = currentPageActions.map((action) => {
      if (action.config.advancedConfig.delayWhenLoaded > 0) {
        return runActionWithDelay(
          action as IExecutionActions,
          abortController.signal,
        )
      } else {
        return runActionWithExecutionResult(
          action as IExecutionActions,
          true,
          abortController.signal,
        )
      }
    })
    Promise.all(requests)
      .catch((_e) => {})
      .finally(() => {
        setIsPageLoading(false)
      })

    return () => {
      abortController.abort()
    }
  }, [currentPageDisplayName])

  if (isPageLoading) {
    return <PageLoading />
  }

  if (!pageNode || pageNode.$widgetType !== "PAGE_NODE") return null

  const finalCanvasWidth =
    canvasSize === "fixed" ? `${canvasWidth}px` : `${canvasWidth}%`

  return (
    <div
      css={applyCanvasContainerWrapperStyle(finalCanvasWidth, mode)}
      ref={containerWrapperRef}
    >
      <div css={pageContainerWrapperStyle} ref={containerRef}>
        {hasHeader && currentPageDisplayName && (
          <RenderHeaderSection
            topHeight={topHeight}
            footerHeight={hasFooter ? bottomHeight : 0}
            containerHeight={bounds.height}
            currentPageDisplayName={currentPageDisplayName}
            columnNumber={headerColumns ?? DEFAULT_BODY_COLUMNS_NUMBER}
          />
        )}
        {hasLeft && currentPageDisplayName && (
          <RenderLeftSection
            leftWidth={realLeftWidth}
            showFoldIcon={showLeftFoldIcon}
            isFold={isLeftFold}
            setIsLeftFold={setIsLeftFold}
            columnNumber={leftColumns ?? DEFAULT_ASIDE_COLUMNS_NUMBER}
          />
        )}
        {currentPageDisplayName && (
          <RenderBodySection
            columnNumber={bodyColumns ?? DEFAULT_BODY_COLUMNS_NUMBER}
          />
        )}
        {hasRight && currentPageDisplayName && (
          <RenderRightSection
            showFoldIcon={showRightFoldIcon}
            isFold={isRightFold}
            rightWidth={realRightWidth}
            setIsRightFold={setIsRightFold}
            columnNumber={rightColumns ?? DEFAULT_ASIDE_COLUMNS_NUMBER}
          />
        )}
        {hasFooter && currentPageDisplayName && (
          <RenderFooterSection
            bottomHeight={bottomHeight}
            containerHeight={bounds.height}
            headerHeight={hasHeader ? topHeight : 0}
            currentPageDisplayName={currentPageDisplayName}
            columnNumber={footerColumns ?? DEFAULT_BODY_COLUMNS_NUMBER}
          />
        )}
      </div>
      <RenderModalSection
        columnNumber={bodyColumns ?? DEFAULT_BODY_COLUMNS_NUMBER}
      />
    </div>
  )
}
