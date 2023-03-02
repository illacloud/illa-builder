import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { FC, useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { applyBarHandlerStyle } from "@/page/App/components/ScaleSquare/style"
import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { AutoHeightWithLimitedContainerProps } from "@/widgetLibrary/PublicSector/AutoHeightWithLimitedContainer/interface"
import {
  applyResizeBarPointStyle,
  containerBorderStyle,
} from "@/widgetLibrary/PublicSector/AutoHeightWithLimitedContainer/style"

export const DEFAULT_MAX_HEIGHT = 80
export const DEFAULT_MIN_GAP = 8

const resizeHandler = {
  bottom: (
    <div css={applyBarHandlerStyle(true, "normal", "b")}>
      <div className="handler" css={applyResizeBarPointStyle} />
    </div>
  ),
}

export const AutoHeightWithLimitedContainer: FC<
  AutoHeightWithLimitedContainerProps
> = ({
  dynamicMaxHeight,
  dynamicMinHeight,
  containerHeight,
  displayName,
  handleUpdateComponentHeight,
}) => {
  const dispatch = useDispatch()
  const [resizeMaxHeight, setResizeMaxHeight] = useState(false)
  const [resizeMinHeight, setResizeMinHeight] = useState(false)

  // const isOverlapWithMaxHeight = dynamicMaxHeight === containerHeight * UNIT_HEIGHT

  const resizeStartCallback: ResizeStartCallback = useCallback(
    (e, dir, elementRef) => {
      setResizeMinHeight(true)
      dispatch(configActions.updateShowDot(true))
    },
    [dispatch],
  )

  const resizeMaxHeightStartCallback: ResizeStartCallback = useCallback(
    (e, dir, elementRef) => {
      setResizeMaxHeight(true)
      dispatch(configActions.updateShowDot(true))
    },
    [dispatch],
  )

  const resizeMaxHeightCallback: ResizeCallback = useCallback(
    (event, direction, elementRef, delta) => {
      setResizeMaxHeight(false)
      const deltaHeight = delta.height
      const finalDynamicMaxHeight =
        Math.round(
          ((dynamicMaxHeight ?? containerHeight + DEFAULT_MAX_HEIGHT) +
            deltaHeight) /
            UNIT_HEIGHT,
        ) * UNIT_HEIGHT
      dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName,
          updateSlice: {
            dynamicMaxHeight: finalDynamicMaxHeight,
          },
        }),
      )
      dispatch(configActions.updateShowDot(false))
    },
    [containerHeight, dispatch, displayName, dynamicMaxHeight],
  )

  const resizeMinHeightCallback: ResizeCallback = useCallback(
    (event, direction, elementRef, delta) => {
      setResizeMinHeight(false)
      const deltaHeight = delta.height
      const finalDynamicMinHeight =
        Math.round(
          ((dynamicMinHeight ?? containerHeight + 3) + deltaHeight) /
            UNIT_HEIGHT,
        ) * UNIT_HEIGHT
      dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName,
          updateSlice: {
            dynamicMinHeight: finalDynamicMinHeight,
          },
        }),
      )
      setTimeout(() => {
        if (finalDynamicMinHeight > containerHeight) {
          handleUpdateComponentHeight(finalDynamicMinHeight)
        }
      }, 30)
      dispatch(configActions.updateShowDot(false))
    },
    [
      containerHeight,
      dispatch,
      displayName,
      dynamicMinHeight,
      handleUpdateComponentHeight,
    ],
  )

  return (
    <>
      <Resizable
        size={{
          width: "100%",
          height: `${dynamicMaxHeight ?? containerHeight + DEFAULT_MAX_HEIGHT}`,
        }}
        style={{
          position: "absolute",
          top: "0",
          pointerEvents: "none",
          backgroundColor: resizeMaxHeight ? "rgba(255, 88, 190, 0.1)" : "",
        }}
        minHeight={dynamicMinHeight + DEFAULT_MIN_GAP}
        handleComponent={resizeHandler}
        enable={{
          bottom: true,
        }}
        onResizeStart={resizeMaxHeightStartCallback}
        onResizeStop={resizeMaxHeightCallback}
        handleWrapperStyle={{
          pointerEvents: "all",
        }}
      >
        <div css={containerBorderStyle("b")} />
        <div css={containerBorderStyle("l")} />
        <div css={containerBorderStyle("r")} />
      </Resizable>
      <Resizable
        size={{
          width: "100%",
          height: `${dynamicMinHeight ?? containerHeight + 3}`,
        }}
        style={{
          position: "absolute",
          top: "0",
          pointerEvents: "none",
          backgroundColor: resizeMinHeight ? "rgba(255, 88, 190, 0.1)" : "",
        }}
        minHeight={27}
        maxHeight={dynamicMaxHeight - DEFAULT_MIN_GAP}
        handleComponent={resizeHandler}
        enable={{
          bottom: true,
        }}
        onResizeStart={resizeStartCallback}
        onResizeStop={resizeMinHeightCallback}
        handleWrapperStyle={{
          pointerEvents: "all",
        }}
      >
        <div css={containerBorderStyle("b", 1)} />
      </Resizable>
    </>
  )
}
