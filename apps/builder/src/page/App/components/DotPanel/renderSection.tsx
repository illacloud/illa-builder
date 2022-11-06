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
  applyContainerWrapperStyle,
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
export const BODY_MIN_WIDTH = 384
export const BODY_MIN_HEIGHT = 512

export const RenderSection = forwardRef<HTMLDivElement, RenderSectionProps>(
  (props, ref) => {
    const { sectionNode, mode } = props
    const [containerBoundRef, containerBound] = useMeasure()
    const containerRef = useRef<HTMLDivElement>(
      null,
    ) as MutableRefObject<HTMLDivElement | null>

    const { viewSortedKey, currentViewIndex } = sectionNode.props
    const currentViewDisplayName = viewSortedKey[currentViewIndex]

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
  } = props

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
          otherPanelHeightPX =
            containerHeight - BODY_MIN_HEIGHT - currentPointPositionY
          if (otherPanelHeightPX <= FOOTER_MIN_HEIGHT) {
            otherPanelHeightPX = FOOTER_MIN_HEIGHT
          }
          currentPointPositionY =
            containerHeight - BODY_MIN_HEIGHT - otherPanelHeightPX
        }
        dispatch(
          componentsActions.updateCurrentPagePropsReducer({
            topHeight: currentPointPositionY,
            bottomHeight: otherPanelHeightPX,
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
  }, [containerHeight, dispatch, footerHeight, offsetTop])

  return (
    <div
      css={applyHeaderSectionWrapperStyle(`${topHeight}px`, "240px", "500px")}
      ref={ref}
    >
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
  } = props

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
          otherPanelHeightPX =
            containerHeight - BODY_MIN_HEIGHT - currentPointPositionY
          if (otherPanelHeightPX <= HEADER_MIN_HEIGHT) {
            otherPanelHeightPX = HEADER_MIN_HEIGHT
          }
          currentPointPositionY =
            containerHeight - BODY_MIN_HEIGHT - otherPanelHeightPX
        }
        dispatch(
          componentsActions.updateCurrentPagePropsReducer({
            bottomHeight: currentPointPositionY,
            topHeight: otherPanelHeightPX,
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
  }, [containerHeight, dispatch, headerHeight, offsetTop])

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
  const { sectionNode, offsetLeft, containerWidth, mode, rightWidth } = props

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
        let otherPanelWidthPX = rightWidth
        if (currentPointPositionX < LEFT_MIN_WIDTH) {
          currentPointPositionX = LEFT_MIN_WIDTH
        }
        if (
          containerWidth - currentPointPositionX - otherPanelWidthPX <
          BODY_MIN_WIDTH
        ) {
          otherPanelWidthPX =
            containerWidth - BODY_MIN_WIDTH - currentPointPositionX
          if (otherPanelWidthPX <= RIGHT_MIN_WIDTH) {
            otherPanelWidthPX = RIGHT_MIN_WIDTH
          }
          currentPointPositionX =
            containerWidth - BODY_MIN_WIDTH - otherPanelWidthPX
        }
        const presetWidth = (currentPointPositionX / containerWidth) * 100
        const otherPanelWidth = (otherPanelWidthPX / containerWidth) * 100
        dispatch(
          componentsActions.updateCurrentPagePropsReducer({
            leftWidth: presetWidth,
            rightWidth: otherPanelWidth,
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
  }, [containerWidth, dispatch, offsetLeft, rightWidth])

  return (
    <div css={applyLeftSectionWrapperStyle("240px", "0px")} ref={ref}>
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
            blockColumns={16}
          />
        )}
      </div>
      {mode === "edit" && (
        <div
          css={resizeHorizontalBarWrapperStyle}
          onMouseDown={handleClickMoveBar}
        >
          <div css={resizeHorizontalBarStyle} />
        </div>
      )}
    </div>
  )
})
RenderLeftSection.displayName = "RenderLeftSection"

export const RenderRightSection = forwardRef<
  HTMLDivElement,
  RenderRightSectionProps
>((props, ref) => {
  const { sectionNode, offsetLeft, containerWidth, mode, leftWidth } = props

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
        let otherPanelWidthPX = leftWidth
        let currentPointPositionX = containerWidth - (clientX - offsetLeft)
        if (currentPointPositionX < RIGHT_MIN_WIDTH) {
          currentPointPositionX = RIGHT_MIN_WIDTH
        }
        if (
          containerWidth - currentPointPositionX - otherPanelWidthPX <
          BODY_MIN_WIDTH
        ) {
          otherPanelWidthPX =
            containerWidth - BODY_MIN_WIDTH - currentPointPositionX
          if (otherPanelWidthPX <= LEFT_MIN_WIDTH) {
            otherPanelWidthPX = LEFT_MIN_WIDTH
          }
          currentPointPositionX =
            containerWidth - BODY_MIN_WIDTH - otherPanelWidthPX
        }
        const presetWidth = (currentPointPositionX / containerWidth) * 100
        const otherPanelWidth = (otherPanelWidthPX / containerWidth) * 100

        dispatch(
          componentsActions.updateCurrentPagePropsReducer({
            rightWidth: presetWidth,
            leftWidth: otherPanelWidth,
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
  }, [containerWidth, dispatch, leftWidth, offsetLeft])

  return (
    <div css={applyRightSectionWrapperStyle("240px", "0px")} ref={ref}>
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
            blockColumns={16}
          />
        )}
      </div>
      {mode === "edit" && (
        <div
          css={resizeHorizontalBarWrapperStyle}
          onMouseDown={handleClickMoveBar}
        >
          <div css={resizeHorizontalBarStyle} />
        </div>
      )}
    </div>
  )
})
RenderRightSection.displayName = "RenderRightSection"
