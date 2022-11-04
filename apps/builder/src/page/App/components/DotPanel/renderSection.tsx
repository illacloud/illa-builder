import { useEffect, useRef, forwardRef } from "react"
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
        if (currentPointPositionY < 98) {
          currentPointPositionY = 98
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
      <div css={containerWrapperStyle} />
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
        if (currentPointPositionY < 98) {
          currentPointPositionY = 98
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
      <div css={containerWrapperStyle} />
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

  const dispatch = useDispatch()

  const handleClickMoveBar = () => {
    isActive.current = true
  }

  useEffect(() => {
    const mouseMoveListener = (e: globalThis.MouseEvent) => {
      if (isActive.current) {
        const { clientX } = e
        let currentPointPositionX = clientX - offsetLeft
        if (currentPointPositionX < 240) {
          currentPointPositionX = 240
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
      <div css={containerWrapperStyle} />
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
        if (currentPointPositionX < 240) {
          currentPointPositionX = 240
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
      <div css={containerWrapperStyle} />
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
