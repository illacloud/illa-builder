import { FC, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import {
  applyCanvasContainerWrapperStyle,
  pageContainerWrapperStyle,
} from "@/page/App/components/DotPanel/style"
import { getCanvasShape, getIllaMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  PageNode,
  SECTION_POSITION,
  SectionNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { RenderPageProps } from "./interface"
import {
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
  RenderFooterSection,
  RenderHeaderSection,
  RenderLeftSection,
  RenderRightSection,
  RenderSection,
} from "./renderSection"

const getShowNameMapSectionNode = (pageNode: PageNode) => {
  const { childrenNode = [] } = pageNode
  const nameMapSection: Map<string, SectionNode> = new Map()
  childrenNode.forEach((node) => {
    if (node.type === "SECTION_NODE") {
      nameMapSection.set(node.showName, node as SectionNode)
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
  const headerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
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
    isFooterFixed,
    isHeaderFixed,
    isLeftFixed,
    isRightFixed,
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
    let leftArea = {
      top: leftTop,
      bottom: leftTop + leftHeight,
      left: 0,
      right: realLeftWidth,
    }
    let rightArea = {
      top: rightTop,
      bottom: rightTop + rightHeight,
      left: realRightWidth,
      right: 0,
    }
    let headerArea = {
      top: 0,
      bottom: topHeight,
      left: headerLeft,
      right: headerLeft + headerWidth,
    }
    let footerArea = {
      top: bodyTop + bodyHeight,
      bottom: bodyTop + bodyHeight + bodyHeight,
      left: footerLeft,
      right: footerLeft + footerWidth,
    }
    let bodyArea = {
      top: bodyTop,
      bottom: bodyTop + bodyHeight,
      left: bodyLeft,
      right: bodyLeft + bodyWidth,
    }

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

    if (hasLeft && leftRef.current) {
      leftRef.current.style.height = `${leftHeight}px`
      leftRef.current.style.top = `${leftTop}px`
      leftArea = {
        top: leftTop,
        bottom: leftTop + leftHeight,
        left: 0,
        right: calcLeftWidth,
      }
    }
    if (hasRight && rightRef.current) {
      rightRef.current.style.height = `${rightHeight}px`
      rightRef.current.style.top = `${rightTop}px`
      rightArea = {
        top: rightTop,
        bottom: rightTop + rightHeight,
        left: calcRightWidth,
        right: 0,
      }
    }
    if (hasHeader && headerRef.current) {
      headerRef.current.style.width = `${headerWidth}px`
      headerRef.current.style.left = `${headerLeft}px`
      headerArea = {
        top: 0,
        bottom: topHeight,
        left: headerLeft,
        right: headerLeft + headerWidth,
      }
    }
    if (hasFooter && footerRef.current) {
      footerRef.current.style.width = `${footerWidth}px`
      footerRef.current.style.left = `${footerLeft}px`
      footerArea = {
        top: bodyTop + bodyHeight,
        bottom: bodyTop + bodyHeight + bodyHeight,
        left: footerLeft,
        right: footerLeft + footerWidth,
      }
    }

    if (bodyRef.current) {
      bodyRef.current.style.position = "absolute"
      bodyRef.current.style.width = `${bodyWidth}px`
      bodyRef.current.style.left = `${bodyLeft}px`
      bodyRef.current.style.top = `${bodyTop}px`
      bodyRef.current.style.height = `${bodyHeight}px`
      bodyArea = {
        top: bodyTop,
        bottom: bodyTop + bodyHeight,
        left: bodyLeft,
        right: bodyLeft + bodyWidth,
      }
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

  const headerSection = showNameMapSectionNode.get("headerSection")
  const bodySection = showNameMapSectionNode.get("bodySection")
  const leftSection = showNameMapSectionNode.get("leftSection")
  const rightSection = showNameMapSectionNode.get("rightSection")
  const footerSection = showNameMapSectionNode.get("footerSection")

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
    <div css={applyCanvasContainerWrapperStyle(finalCanvasWidth, mode)}>
      <div css={pageContainerWrapperStyle} ref={containerRef}>
        {hasHeader && headerSection && currentPageDisplayName && (
          <RenderHeaderSection
            sectionNode={headerSection}
            ref={headerRef}
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
            ref={leftRef}
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
            ref={bodyRef}
            mode={mode}
            columns={bodyColumns}
          />
        )}
        {hasRight && rightSection && currentPageDisplayName && (
          <RenderRightSection
            sectionNode={rightSection}
            ref={rightRef}
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
            ref={footerRef}
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
    </div>
  )
}
