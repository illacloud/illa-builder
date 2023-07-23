import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { FC, useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import {
  getIsILLAEditMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getExecutionWidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { TransformWidgetWrapper } from "@/widgetLibrary/PublicSector/TransformWidgetWrapper"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { AutoHeightWithLimitedContainer } from "./components/AutoHeightWithLimitedContainer"
import { DragContainer } from "./components/DragContainer"
import { getResizeHandler } from "./components/ResizingContainer/utils"
import WrapperContainer from "./components/WrapperContainer"
import { MOVE_BAR_HEIGHT } from "./constant/moveBar"
import { DEFAULT_MIN_COLUMN } from "./constant/widget"
import { ScaleSquareProps } from "./interface"
import { modalstopPropagationContainerStyle } from "./style"
import { useGetRealShapeAndPosition } from "./utils/getRealShapeAndPosition"
import { useScaleStateSelector } from "./utils/useScaleStateSelector"

export const ModalScaleSquare: FC<ScaleSquareProps> = (props) => {
  const {
    unitW,
    displayName,
    parentNodeDisplayName,
    widgetType,
    columnNumber,
  } = props
  const { width, height } = useGetRealShapeAndPosition(displayName, unitW)

  const dispatch = useDispatch()

  const layoutInfoResult = useSelector(getExecutionWidgetLayoutInfo)
  const currentWidgetLayoutInfo = layoutInfoResult[displayName]

  const layoutInfo = currentWidgetLayoutInfo?.layoutInfo ?? {}

  const canDrag = widgetType !== "MODAL_WIDGET"

  const isEditMode = useSelector(getIsILLAEditMode)
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])

  const scaleState = useScaleStateSelector(displayName)

  const handleOnResizeStop: ResizeCallback = useCallback(
    (e, dir, ref, delta) => {
      let finalWidth = Math.round((width + delta.width) / unitW)
      let finalHeight = Math.round((height + delta.height) / UNIT_HEIGHT)
      finalWidth =
        finalWidth < DEFAULT_MIN_COLUMN ? DEFAULT_MIN_COLUMN : finalWidth
      finalHeight =
        finalHeight < layoutInfo.minH ? layoutInfo.minH : finalHeight

      dispatch(
        componentsActions.updateComponentLayoutInfoReducer({
          displayName,
          layoutInfo: {
            x: 0,
            y: 0,
            w: finalWidth,
            h: finalHeight,
          },
          parentNode: parentNodeDisplayName,
        }),
      )
      dispatch(executionActions.setDraggingNodeIDsReducer([]))

      dispatch(configActions.updateShowDot(false))
    },
    [
      dispatch,
      displayName,
      height,
      layoutInfo.minH,
      parentNodeDisplayName,
      unitW,
      width,
    ],
  )

  const handleResizeStart: ResizeStartCallback = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(executionActions.setDraggingNodeIDsReducer([displayName]))

      dispatch(configActions.updateShowDot(true))
    },
    [dispatch, displayName],
  )

  return (
    <Resizable
      bounds="parent"
      size={{
        width,
        height,
      }}
      minWidth={DEFAULT_MIN_COLUMN * unitW}
      minHeight={currentWidgetLayoutInfo.layoutInfo.minH * UNIT_HEIGHT}
      handleComponent={getResizeHandler(
        RESIZE_DIRECTION.ALL,
        isSelected,
        scaleState,
      )}
      onResizeStart={handleResizeStart}
      onResizeStop={handleOnResizeStop}
    >
      <div
        css={modalstopPropagationContainerStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <DragContainer
          displayName={displayName}
          parentNodeDisplayName={parentNodeDisplayName}
          canDrag={canDrag}
          columnNumber={columnNumber}
          unitWidth={unitW}
        >
          <WrapperContainer
            displayName={displayName}
            parentNodeDisplayName={parentNodeDisplayName}
            widgetHeight={height}
            widgetWidth={width}
            widgetType={widgetType}
            widgetTop={MOVE_BAR_HEIGHT}
            columnNumber={columnNumber}
          >
            <TransformWidgetWrapper
              displayName={displayName}
              widgetType={widgetType}
              parentNodeDisplayName={parentNodeDisplayName}
            />
          </WrapperContainer>
        </DragContainer>
        {isEditMode && selectedComponents?.length === 1 && isSelected && (
          <AutoHeightWithLimitedContainer
            containerHeight={width}
            displayName={displayName}
          />
        )}
      </div>
    </Resizable>
  )
}
