import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { FC, useCallback } from "react"
import { useDispatch } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { applyBarHandlerStyle } from "@/page/App/components/ScaleSquare/style"
import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { AutoHeightWithLimitedContainerProps } from "@/widgetLibrary/PublicSector/AutoHeightWithLimitedContainer/interface"
import {
  applyResizeBarPointStyle,
  bottomBarContainerStyle,
  containerStyle,
} from "@/widgetLibrary/PublicSector/AutoHeightWithLimitedContainer/style"

export const DEFAULT_HEIGHT = 80
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
  resizeStart,
  handleUpdateComponentHeight,
}) => {
  const dispatch = useDispatch()

  const resizeStartCallback: ResizeStartCallback = useCallback(
    (e, dir, elementRef) => {
      dispatch(configActions.updateShowDot(true))
    },
    [dispatch],
  )

  const resizeMaxHeightCallback: ResizeCallback = useCallback(
    (event, direction, elementRef, delta) => {
      const deltaHeight = delta.height
      const finalDynamicMaxHeight =
        Math.round(
          ((dynamicMaxHeight ?? containerHeight + DEFAULT_HEIGHT) +
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
        handleUpdateComponentHeight(finalDynamicMinHeight)
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
          // 2 is padding with wrapper
          height: `${dynamicMaxHeight + 2 ?? containerHeight + DEFAULT_HEIGHT}`,
        }}
        style={{
          position: "absolute",
          top: "0",
          zIndex: -1,
          pointerEvents: "none",
        }}
        minHeight={dynamicMinHeight + DEFAULT_MIN_GAP}
        handleComponent={resizeHandler}
        enable={{
          bottom: true,
        }}
        onResizeStart={resizeStartCallback}
        onResizeStop={resizeMaxHeightCallback}
        handleWrapperStyle={{
          pointerEvents: "all",
        }}
      >
        <div css={containerStyle} />
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
        <div css={bottomBarContainerStyle} />
      </Resizable>
    </>
  )
}
