import { get } from "lodash-es"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { FC, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { AutoHeightWithLimitedContainerProps } from "@/page/App/components/ScaleSquare/components/AutoHeightWithLimitedContainer/interface"
import {
  applyResizeBarPointStyle,
  containerBorderStyle,
} from "@/page/App/components/ScaleSquare/components/AutoHeightWithLimitedContainer/style"
import { applyBarHandlerStyle } from "@/page/App/components/ScaleSquare/style"
import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"

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
> = ({ containerHeight, displayName }) => {
  const dispatch = useDispatch()
  const [resizeMaxHeight, setResizeMaxHeight] = useState(false)
  const [resizeMinHeight, setResizeMinHeight] = useState(false)
  const executionResult = useSelector(getExecutionResult)
  const layoutInfoResult = useSelector(getClientWidgetLayoutInfo)

  const dynamicMinHeight = get(
    executionResult,
    `${displayName}.dynamicMinHeight`,
    0,
  )
  const dynamicMaxHeight = get(
    executionResult,
    `${displayName}.dynamicMaxHeight`,
    0,
  )
  const widgetH = get(
    layoutInfoResult,
    `${displayName}.layoutInfo.h`,
    0,
  ) as number

  const isAutoLimitedMode =
    get(executionResult, `${displayName}.dynamicHeight`, "fixed") === "limited"

  const handleUpdateComponentHeight = useCallback(
    (height: number) => {
      const finalHeight = Math.ceil(height / UNIT_HEIGHT)

      dispatch(
        componentsActions.updateComponentNodeHeightReducer({
          displayName: displayName,
          height: finalHeight,
          oldHeight: widgetH,
        }),
      )
    },
    [displayName, widgetH, dispatch],
  )

  const resizeStartCallback: ResizeStartCallback = useCallback(() => {
    setResizeMinHeight(true)
    dispatch(configActions.updateShowDot(true))
    dispatch(
      configActions.setResizingNodeIDsReducer([
        `${displayName}-resize-minHeight`,
      ]),
    )
  }, [dispatch, displayName])

  const resizeMaxHeightStartCallback: ResizeStartCallback = useCallback(() => {
    setResizeMaxHeight(true)
    dispatch(configActions.updateShowDot(true))
    dispatch(
      configActions.setResizingNodeIDsReducer([
        `${displayName}-resize-maxHeight`,
      ]),
    )
  }, [dispatch, displayName])

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
      window.setTimeout(() => {
        dispatch(configActions.setResizingNodeIDsReducer([]))
      }, 16)
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
      window.setTimeout(() => {
        dispatch(configActions.setResizingNodeIDsReducer([]))
      }, 16)
    },
    [
      containerHeight,
      dispatch,
      displayName,
      dynamicMinHeight,
      handleUpdateComponentHeight,
    ],
  )

  return isAutoLimitedMode ? (
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
  ) : null
}
