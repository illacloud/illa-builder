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
  applyCanvasContainerWrapperStyle,
  pageContainerWrapperStyle,
} from "@/page/App/components/DotPanel/style"
import { getCanvasShape, getIllaMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"
import {
  ModalSectionNode,
  PageNode,
  SECTION_POSITION,
  SectionNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { getCurrentPageRunPages } from "@/redux/currentApp/executionTree/executionSelector"
import store from "@/store"
import {
  runActionWithDelay,
  runActionWithExecutionResult,
} from "@/utils/action/runAction"
import { PageLoading } from "./PageLoading/pageLoading"
import { RenderPageProps } from "./interface"
import {
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
  RenderFooterSection,
  RenderHeaderSection,
  RenderLeftSection,
  RenderModalSection,
  RenderRightSection,
  RenderSection,
} from "./renderSection"

const getShowNameMapSectionNode = (pageNode: PageNode) => {
  const { childrenNode = [] } = pageNode
  const nameMapSection: Map<string, SectionNode | ModalSectionNode> = new Map()
  childrenNode.forEach((node) => {
    if (node.type === "SECTION_NODE") {
      nameMapSection.set(node.showName, node as SectionNode)
    }
    if (node.type === "MODAL_SECTION_NODE") {
      nameMapSection.set(node.showName, node as ModalSectionNode)
    }
  })
  return nameMapSection
}

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
  const { pageNode, currentPageDisplayName } = props
  const containerWrapperRef = useRef<HTMLDivElement>(null)
  const [containerRef, bounds] = useMeasure()
  const canvasShape = useSelector(getCanvasShape)
  const mode = useSelector(getIllaMode)
  const dispatch = useDispatch()

  const showNameMapSectionNode = getShowNameMapSectionNode(pageNode)

  const { props: pageProps } = pageNode
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
  } = pageProps

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
    const rootState = store.getState()
    const currentPageActions = getCurrentPageRunPages(rootState)
    setIsPageLoading(true)
    const requests = currentPageActions.map((action) => {
      const mergedAction = {
        ...action,
        resourceId: action.$resourceId,
        actionId: action.$actionId,
      }
      if (action.config.advancedConfig.delayWhenLoaded > 0) {
        return runActionWithDelay(mergedAction as ActionItem<ActionContent>)
      } else {
        return runActionWithExecutionResult(
          mergedAction as ActionItem<ActionContent>,
        )
      }
    })
    Promise.all(requests).finally(() => {
      setIsPageLoading(false)
    })
  }, [])

  if (isPageLoading) {
    return <PageLoading />
  }

  const headerSection = showNameMapSectionNode.get("headerSection") as
    | SectionNode
    | undefined
  const bodySection = showNameMapSectionNode.get("bodySection") as
    | SectionNode
    | undefined
  const leftSection = showNameMapSectionNode.get("leftSection") as
    | SectionNode
    | undefined
  const rightSection = showNameMapSectionNode.get("rightSection") as
    | SectionNode
    | undefined
  const footerSection = showNameMapSectionNode.get("footerSection") as
    | SectionNode
    | undefined
  const modalSection = showNameMapSectionNode.get("modalSection") as
    | ModalSectionNode
    | undefined

  if (
    !pageNode ||
    pageNode.type !== "PAGE_NODE" ||
    !pageNode.props ||
    showNameMapSectionNode.size === 0
  )
    return null

  const finalCanvasWidth =
    canvasSize === "fixed" ? `${canvasWidth}px` : `${canvasWidth}%`

  return (
    <div
      css={applyCanvasContainerWrapperStyle(finalCanvasWidth, mode)}
      ref={containerWrapperRef}
    >
      <div css={pageContainerWrapperStyle} ref={containerRef}>
        {hasHeader && headerSection && currentPageDisplayName && (
          <RenderHeaderSection
            sectionNode={headerSection}
            topHeight={topHeight}
            offsetTop={bounds.top}
            mode={mode}
            footerHeight={hasFooter ? bottomHeight : 0}
            containerHeight={bounds.height}
            currentPageDisplayName={currentPageDisplayName}
            leftPosition={leftPosition}
            rightPosition={rightPosition}
            columns={headerColumns}
          />
        )}
        {hasLeft && leftSection && currentPageDisplayName && (
          <RenderLeftSection
            sectionNode={leftSection}
            offsetLeft={bounds.left}
            containerWidth={bounds.width}
            mode={mode}
            leftWidth={realLeftWidth}
            rightWidth={realRightWidth}
            currentPageDisplayName={currentPageDisplayName}
            leftPosition={leftPosition}
            showFoldIcon={showLeftFoldIcon}
            isFold={isLeftFold}
            setIsLeftFold={setIsLeftFold}
            canvasSize={canvasSize}
            columns={leftColumns}
          />
        )}
        {bodySection && currentPageDisplayName && (
          <RenderSection
            sectionNode={bodySection}
            mode={mode}
            columns={bodyColumns}
          />
        )}
        {hasRight && rightSection && currentPageDisplayName && (
          <RenderRightSection
            sectionNode={rightSection}
            offsetLeft={bounds.left}
            containerWidth={bounds.width}
            mode={mode}
            leftWidth={realLeftWidth}
            currentPageDisplayName={currentPageDisplayName}
            rightPosition={rightPosition}
            showFoldIcon={showRightFoldIcon}
            isFold={isRightFold}
            rightWidth={realRightWidth}
            setIsRightFold={setIsRightFold}
            canvasSize={canvasSize}
            columns={rightColumns}
          />
        )}
        {hasFooter && footerSection && currentPageDisplayName && (
          <RenderFooterSection
            sectionNode={footerSection}
            bottomHeight={bottomHeight}
            offsetTop={bounds.top}
            containerHeight={bounds.height}
            mode={mode}
            headerHeight={hasHeader ? topHeight : 0}
            currentPageDisplayName={currentPageDisplayName}
            leftPosition={leftPosition}
            rightPosition={rightPosition}
            columns={footerColumns}
          />
        )}
      </div>
      {modalSection && (
        <RenderModalSection
          sectionNode={modalSection}
          mode={mode}
          columns={bodyColumns}
        />
      )}
    </div>
  )
}
