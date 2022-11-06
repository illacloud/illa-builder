import { FC, useMemo, useRef, useLayoutEffect } from "react"
import {
  PageNode,
  SectionNode,
  SECTION_POSITION,
} from "@/redux/currentApp/editor/components/componentsState"
import { RenderPageProps } from "./interface"
import {
  RenderFooterSection,
  RenderHeaderSection,
  RenderLeftSection,
  RenderRightSection,
  RenderSection,
} from "./renderSection"
import useMeasure from "react-use-measure"

const getDisplayNameMapSectionNode = (pageNode: PageNode) => {
  const { childrenNode = [] } = pageNode
  const nameMapSection: Map<string, SectionNode> = new Map()
  childrenNode.forEach((node) => {
    if (node.type === "SECTION_NODE") {
      nameMapSection.set(node.displayName, node as SectionNode)
    }
  })
  return nameMapSection
}

const getLeftAndRightWidth = (
  canvasSize: "responsive" | "fixed",
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
  const { pageNode } = props
  const headerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [containerRef, bounds] = useMeasure()

  const displayNameMapSectionNode = getDisplayNameMapSectionNode(pageNode)

  const { props: pageProps } = pageNode
  const {
    canvasSize,
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
  } = pageProps

  useLayoutEffect(() => {
    const realLeftWidth = hasLeft
      ? getLeftAndRightWidth(canvasSize, leftWidth, bounds.width)
      : 0
    const realRightWidth = hasRight
      ? getLeftAndRightWidth(canvasSize, rightWidth, bounds.width)
      : 0
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
      bodyWidth -= realLeftWidth
      bodyLeft = realLeftWidth
      switch (leftPosition) {
        case SECTION_POSITION.TOP: {
          headerLeft = realLeftWidth
          headerWidth -= realLeftWidth
          leftHeight -= bottomHeight
          break
        }
        case SECTION_POSITION.FULL: {
          headerLeft = realLeftWidth
          headerWidth -= realLeftWidth
          footerLeft = realLeftWidth
          footerWidth -= realLeftWidth
          break
        }
        case SECTION_POSITION.BOTTOM: {
          footerLeft = realLeftWidth
          footerWidth -= realLeftWidth
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
      bodyWidth -= realRightWidth
      switch (rightPosition) {
        case SECTION_POSITION.TOP: {
          headerWidth -= realRightWidth
          rightHeight -= bottomHeight
          break
        }
        case SECTION_POSITION.FULL: {
          headerWidth -= realRightWidth
          footerWidth -= realRightWidth
          break
        }
        case SECTION_POSITION.BOTTOM: {
          footerWidth -= realRightWidth
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
      bodyHeight -= topHeight
    }

    if (hasLeft && leftRef.current) {
      leftRef.current.style.width = `${realLeftWidth}px`
      leftRef.current.style.height = `${leftHeight}px`
      leftRef.current.style.top = `${leftTop}px`
    }
    if (hasRight && rightRef.current) {
      rightRef.current.style.width = `${realRightWidth}px`
      rightRef.current.style.height = `${rightHeight}px`
      rightRef.current.style.top = `${rightTop}px`
    }
    if (hasHeader && headerRef.current) {
      headerRef.current.style.width = `${headerWidth}px`
      headerRef.current.style.left = `${headerLeft}px`
    }
    if (hasFooter && footerRef.current) {
      footerRef.current.style.width = `${footerWidth}px`
      footerRef.current.style.left = `${footerLeft}px`
    }

    if (bodyRef.current) {
      bodyRef.current.style.position = "absolute"
      bodyRef.current.style.width = `${bodyWidth}px`
      bodyRef.current.style.left = `${bodyLeft}px`
      bodyRef.current.style.top = `${bodyTop}px`
      bodyRef.current.style.height = `${bodyHeight}px`
    }
  }, [
    bottomHeight,
    bounds,
    canvasSize,
    hasFooter,
    hasHeader,
    hasLeft,
    hasRight,
    leftPosition,
    leftWidth,
    rightPosition,
    rightWidth,
    topHeight,
  ])

  const headerSection = displayNameMapSectionNode.get("headerSection")
  const bodySection = displayNameMapSectionNode.get("bodySection")
  const leftSection = displayNameMapSectionNode.get("leftSection")
  const rightSection = displayNameMapSectionNode.get("rightSection")
  const footerSection = displayNameMapSectionNode.get("footerSection")

  if (
    !pageNode ||
    pageNode.type !== "PAGE_NODE" ||
    !pageNode.props ||
    displayNameMapSectionNode.size === 0
  )
    return null

  return (
    <div style={{ width: "100%", height: "100%" }} ref={containerRef}>
      {hasHeader && headerSection && (
        <RenderHeaderSection
          sectionNode={headerSection}
          ref={headerRef}
          topHeight={topHeight}
          offsetTop={bounds.top}
        />
      )}
      {hasLeft && leftSection && (
        <RenderLeftSection
          sectionNode={leftSection}
          ref={leftRef}
          offsetLeft={bounds.left}
          containerWidth={bounds.width}
        />
      )}
      {bodySection && <RenderSection sectionNode={bodySection} ref={bodyRef} />}
      {hasRight && rightSection && (
        <RenderRightSection
          sectionNode={rightSection}
          ref={rightRef}
          offsetLeft={bounds.left}
          containerWidth={bounds.width}
        />
      )}
      {hasFooter && footerSection && (
        <RenderFooterSection
          sectionNode={footerSection}
          ref={footerRef}
          bottomHeight={bottomHeight}
          offsetTop={bounds.top}
          containerHeight={bounds.height}
        />
      )}
    </div>
  )
}
