import { useEffect, useRef, forwardRef, MutableRefObject } from "react"
import { useDispatch } from "react-redux"
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
  containerWrapperStyle,
  resizeHorizontalBarStyle,
  resizeHorizontalBarWrapperStyle,
  resizeVerticalBarStyle,
  resizeVerticalBarWrapperStyle,
} from "./style"
import { RenderComponentCanvas } from "./renderComponentCanvas"
import useMeasure from "react-use-measure"

export const HEADER_MIN_HEIGHT = 96
export const FOOTER_MIN_HEIGHT = 96
export const LEFT_MIN_WIDTH = 240
export const RIGHT_MIN_WIDTH = 240

export const RenderSection = forwardRef<HTMLDivElement, RenderSectionProps>(
  (props, ref) => {
    const { sectionNode } = props

    if (
      !sectionNode ||
      sectionNode.type !== "SECTION_NODE" ||
      !sectionNode.props
    )
      return null
    let sectionNodeProps = sectionNode.props

    const { viewSortedKey, currentViewIndex } = sectionNode.props

    return (
      <div ref={ref}>
        <div css={containerWrapperStyle} />
      </div>
    )
  },
)

RenderSection.displayName = "RenderSection"

export const RenderHeaderSection = forwardRef<
  HTMLDivElement,
  RenderHeaderSectionProps
>((props, ref) => {
  const { sectionNode, topHeight, offsetTop } = props

  let sectionNodeProps = sectionNode.props

  const { viewSortedKey, currentViewIndex } = sectionNode.props
  const isActive = useRef<boolean>(false)
  const currentViewDisplayName = viewSortedKey[currentViewIndex]

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
        const { clientY } = e
        let currentPointPositionY = clientY - offsetTop
        if (currentPointPositionY % 8 !== 0) {
          currentPointPositionY = Math.round(currentPointPositionY / 8) * 8
        }
        if (currentPointPositionY < HEADER_MIN_HEIGHT) {
          currentPointPositionY = HEADER_MIN_HEIGHT
        }
        dispatch(
          componentsActions.updateCurrentPagePropsReducer({
            topHeight: currentPointPositionY,
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
  }, [dispatch, offsetTop])

  return (
    <div
      css={applyHeaderSectionWrapperStyle(`${topHeight}px`, "240px", "500px")}
      ref={ref}
    >
      <div
        css={containerWrapperStyle}
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
      <div
        css={resizeVerticalBarWrapperStyle}
        onMouseDown={handleClickMoveBar}
        draggable={false}
      >
        <div css={resizeVerticalBarStyle} draggable={false} />
      </div>
    </div>
  )
})
RenderHeaderSection.displayName = "RenderHeaderSection"

export const RenderFooterSection = forwardRef<
  HTMLDivElement,
  RenderFooterSectionProps
>((props, ref) => {
  const { sectionNode, bottomHeight, containerHeight, offsetTop } = props

  let sectionNodeProps = sectionNode.props

  const { viewSortedKey, currentViewIndex } = sectionNode.props
  const currentViewDisplayName = viewSortedKey[currentViewIndex]

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
        if (currentPointPositionY % 8 !== 0) {
          currentPointPositionY = Math.round(currentPointPositionY / 8) * 8
        }
        if (currentPointPositionY < FOOTER_MIN_HEIGHT) {
          currentPointPositionY = FOOTER_MIN_HEIGHT
        }
        dispatch(
          componentsActions.updateCurrentPagePropsReducer({
            bottomHeight: currentPointPositionY,
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
  }, [containerHeight, dispatch, offsetTop])

  return (
    <div
      css={applyFooterSectionWrapperStyle(
        `${bottomHeight}px`,
        "240px",
        "500px",
      )}
      ref={ref}
    >
      <div
        css={containerWrapperStyle}
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
      <div
        css={resizeVerticalBarWrapperStyle}
        onMouseDown={handleClickMoveBar}
        draggable={false}
      >
        <div css={resizeVerticalBarStyle} draggable={false} />
      </div>
    </div>
  )
})
RenderFooterSection.displayName = "RenderHeaderSection"

export const RenderLeftSection = forwardRef<
  HTMLDivElement,
  RenderLeftSectionProps
>((props, ref) => {
  const { sectionNode, offsetLeft, containerWidth } = props

  let sectionNodeProps = sectionNode.props

  const { viewSortedKey, currentViewIndex } = sectionNode.props

  const isActive = useRef<boolean>(false)
  const currentViewDisplayName = viewSortedKey[currentViewIndex]

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
        if (currentPointPositionX < LEFT_MIN_WIDTH) {
          currentPointPositionX = LEFT_MIN_WIDTH
        }
        const presetWidth = (currentPointPositionX / containerWidth) * 100

        dispatch(
          componentsActions.updateCurrentPagePropsReducer({
            leftWidth: presetWidth,
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
  }, [containerWidth, dispatch, offsetLeft])

  return (
    <div css={applyLeftSectionWrapperStyle("240px", "0px")} ref={ref}>
      <div
        css={containerWrapperStyle}
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
            blockColumns={16}
          />
        )}
      </div>
      <div
        css={resizeHorizontalBarWrapperStyle}
        onMouseDown={handleClickMoveBar}
      >
        <div css={resizeHorizontalBarStyle} />
      </div>
    </div>
  )
})
RenderLeftSection.displayName = "RenderLeftSection"

export const RenderRightSection = forwardRef<
  HTMLDivElement,
  RenderRightSectionProps
>((props, ref) => {
  const { sectionNode, offsetLeft, containerWidth } = props

  let sectionNodeProps = sectionNode.props

  const { viewSortedKey, currentViewIndex } = sectionNode.props

  const currentViewDisplayName = viewSortedKey[currentViewIndex]

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
        const { clientX } = e
        let currentPointPositionX = containerWidth - (clientX - offsetLeft)
        if (currentPointPositionX < RIGHT_MIN_WIDTH) {
          currentPointPositionX = RIGHT_MIN_WIDTH
        }
        const presetWidth = (currentPointPositionX / containerWidth) * 100

        dispatch(
          componentsActions.updateCurrentPagePropsReducer({
            rightWidth: presetWidth,
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
  }, [containerWidth, dispatch, offsetLeft])

  return (
    <div css={applyRightSectionWrapperStyle("240px", "0px")} ref={ref}>
      <div
        css={containerWrapperStyle}
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
            blockColumns={16}
          />
        )}
      </div>
      <div
        css={resizeHorizontalBarWrapperStyle}
        onMouseDown={handleClickMoveBar}
      >
        <div css={resizeHorizontalBarStyle} />
      </div>
    </div>
  )
})
RenderRightSection.displayName = "RenderRightSection"
