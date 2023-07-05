import { cloneDeep, get, throttle } from "lodash"
import { FC, useCallback, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Rnd, RndResizeCallback, RndResizeStartCallback } from "react-rnd"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { illaSnapshot } from "@/page/App/components/DotPanel/constant/snapshotNew"
import { getNewPositionWithCrossing } from "@/page/App/components/DotPanel/utils/crossingHelper"
import { sendShadowMessageHandler } from "@/page/App/components/DotPanel/utils/sendBinaryMessage"
import { AutoHeightWithLimitedContainer } from "@/page/App/components/ScaleSquare/components/AutoHeightWithLimitedContainer"
import { DEFAULT_MIN_COLUMN } from "@/page/App/components/ScaleSquare/constant/widget"
import { useScaleStateSelector } from "@/page/App/components/ScaleSquare/utils/useScaleStateSelector"
import {
  getIsILLAEditMode,
  getIsLikeProductMode,
  getSelectedComponentDisplayNames,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getComponentAttachUsers,
  getTargetCurrentUsersExpendMe,
} from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { getFirstDragShadowInfo } from "@/redux/currentApp/dragShadow/dragShadowSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  getDraggingComponentIDs,
  getExecutionResult,
  getExecutionWidgetLayoutInfo,
  getIsDragging,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { BatchUpdateWidgetLayoutInfoPayload } from "@/redux/currentApp/executionTree/executionState"
import { WidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionState"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import store, { RootState } from "@/store"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { ResizingContainerProps } from "./interface"
import { applyRNDWrapperStyle } from "./style"
import { getEnableResizing, getResizeHandler } from "./utils"

export const ResizingContainer: FC<ResizingContainerProps> = (props) => {
  const {
    unitW,
    displayName,
    children,
    parentNodeDisplayName,
    widgetHeight,
    widgetTop,
    widgetLeft,
    widgetWidth,
  } = props

  const dispatch = useDispatch()

  const prevEffectedDisplayNamesRef = useRef<string[]>([])

  const firstDragShadow = useSelector(getFirstDragShadowInfo)

  const isResizingWithOthers = firstDragShadow.some((dragShadow) => {
    return dragShadow?.displayNames?.includes(displayName)
  })

  const isEditMode = useSelector(getIsILLAEditMode)
  const isLikeProductionMode = useSelector(getIsLikeProductMode)
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const executionResult = useSelector(getExecutionResult)
  const layoutInfoResult = useSelector(getExecutionWidgetLayoutInfo)
  const currentWidgetLayoutInfo = layoutInfoResult[displayName]
  const currentWidgetProps = get(executionResult, displayName, {})
  const scaleState = useScaleStateSelector(displayName)
  const hasEditors = useSelector<RootState, boolean>((rootState) => {
    const currentUserID = getCurrentUser(rootState).userId
    const componentsAttachedUsers = getComponentAttachUsers(rootState)
    return (
      getTargetCurrentUsersExpendMe(
        componentsAttachedUsers,
        displayName,
        currentUserID,
      ).length > 0
    )
  })

  const draggingComponentNodes = useSelector(getDraggingComponentIDs)
  const isDragging = draggingComponentNodes.includes(displayName)
  const isDraggingStateInGlobal = useSelector(getIsDragging)

  const isAutoLimitedMode =
    get(currentWidgetProps, `dynamicHeight`, "fixed") === "limited"

  const resizeDirection = useMemo(() => {
    const direction =
      currentWidgetProps.resizeDirection ??
      widgetBuilder(currentWidgetProps.$widgetType)?.config?.resizeDirection
    return direction || RESIZE_DIRECTION.ALL
  }, [currentWidgetProps.$widgetType, currentWidgetProps.resizeDirection])

  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])

  const throttleUpdateComponentPositionByReflow = useMemo(() => {
    return throttle((newItem: WidgetLayoutInfo) => {
      const effectMap = getNewPositionWithCrossing(
        {
          x: newItem.layoutInfo.x,
          y: newItem.layoutInfo.y,
          w: newItem.layoutInfo.w,
          h: newItem.layoutInfo.h,
        },
        parentNodeDisplayName,
        [newItem.displayName],
      )
      const snapshotMap = cloneDeep(illaSnapshot.getSnapshot())

      const updateSlice: BatchUpdateWidgetLayoutInfoPayload[] = [
        {
          displayName: newItem.displayName,
          layoutInfo: {
            x: newItem.layoutInfo.x,
            y: newItem.layoutInfo.y,
            w: newItem.layoutInfo.w,
            h: newItem.layoutInfo.h,
          },
        },
      ]

      for (let i = 0; i < prevEffectedDisplayNamesRef.current.length; i++) {
        const effectName = prevEffectedDisplayNamesRef.current[i]
        if (effectMap && effectMap.has(effectName)) {
          continue
        }
        const layoutInfo = snapshotMap[effectName]
        if (layoutInfo) {
          updateSlice.push({
            displayName: effectName,
            layoutInfo: {
              x: layoutInfo.layoutInfo.x,
              y: layoutInfo.layoutInfo.y,
              w: layoutInfo.layoutInfo.w,
              h: layoutInfo.layoutInfo.h,
            },
          })
        }
      }
      prevEffectedDisplayNamesRef.current = []

      if (effectMap && effectMap.size > 0) {
        effectMap.forEach((widgetLayoutInfo) => {
          updateSlice.push({
            displayName: widgetLayoutInfo.displayName,
            layoutInfo: {
              x: widgetLayoutInfo.layoutInfo.x,
              y: widgetLayoutInfo.layoutInfo.y,
              w: widgetLayoutInfo.layoutInfo.w,
              h: widgetLayoutInfo.layoutInfo.h,
            },
          })
          prevEffectedDisplayNamesRef.current = Array.from(
            new Set([
              ...prevEffectedDisplayNamesRef.current,
              widgetLayoutInfo.displayName,
            ]),
          )
        })
      }
      dispatch(executionActions.batchUpdateWidgetLayoutInfoReducer(updateSlice))
    }, 16)
  }, [dispatch, parentNodeDisplayName])

  const handleResizeStart: RndResizeStartCallback = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(executionActions.setResizingNodeIDsReducer([displayName]))
      const rootState = store.getState()
      illaSnapshot.setSnapshot(getExecutionWidgetLayoutInfo(rootState))
      dispatch(configActions.updateShowDot(true))
    },
    [dispatch, displayName],
  )

  const handleResize: RndResizeCallback = useCallback(
    (e, dir, elementRef, delta, position) => {
      const item = currentWidgetLayoutInfo
      const snapShot = illaSnapshot.getSnapshot()
      const snapShotShape = snapShot[displayName]
      const { width: deltaWidth, height: deltaHeight } = delta
      const finalWidth = Math.round(
        (snapShotShape.layoutInfo.w * unitW + deltaWidth) / unitW,
      )
      const finalHeight = Math.round(
        (snapShotShape.layoutInfo.h * UNIT_HEIGHT + deltaHeight) / UNIT_HEIGHT,
      )
      const positionX = Math.round(position.x / unitW)
      const positionY = Math.round(position.y / UNIT_HEIGHT)

      const newItem: WidgetLayoutInfo = {
        ...item,
        layoutInfo: {
          ...item.layoutInfo,
          x: positionX,
          y: positionY,
          w: finalWidth,
          h: finalHeight,
        },
      }
      throttleUpdateComponentPositionByReflow(newItem)
      sendShadowMessageHandler(
        2,
        parentNodeDisplayName,
        [displayName],
        0,
        0,
        0,
        0,
        newItem.layoutInfo.x,
        newItem.layoutInfo.y,
        newItem.layoutInfo.w,
        newItem.layoutInfo.h,
      )
    },
    [
      currentWidgetLayoutInfo,
      displayName,
      parentNodeDisplayName,
      throttleUpdateComponentPositionByReflow,
      unitW,
    ],
  )

  const handleOnResizeStop: RndResizeCallback = useCallback(
    (e, dir, ref, delta, position) => {
      const { width: deltaWidth, height: deltaHeight } = delta
      const snapShot = illaSnapshot.getSnapshot()
      const snapShotShape = snapShot[displayName]
      let finalW = Math.round(
        (snapShotShape.layoutInfo.w * unitW + deltaWidth) / unitW,
      )
      let finalH = Math.round(
        (snapShotShape.layoutInfo.h * UNIT_HEIGHT + deltaHeight) / UNIT_HEIGHT,
      )
      const x = Math.round(position.x / unitW)
      const y = Math.round(position.y / UNIT_HEIGHT)
      finalW = finalW < DEFAULT_MIN_COLUMN ? DEFAULT_MIN_COLUMN : finalW
      finalH =
        finalH < currentWidgetLayoutInfo.layoutInfo.minH
          ? currentWidgetLayoutInfo.layoutInfo.minH
          : finalH

      sendShadowMessageHandler(-1, "", [], 0, 0, 0, 0, 0, 0, 0, 0)

      dispatch(
        componentsActions.updateComponentLayoutInfoReducer({
          displayName: displayName,
          layoutInfo: {
            x,
            y,
            w: finalW,
            h: finalH,
          },
          parentNode: parentNodeDisplayName,
        }),
      )
      dispatch(executionActions.setResizingNodeIDsReducer([]))

      dispatch(configActions.updateShowDot(false))
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.DRAG, {
        element: "component",
        parameter1: currentWidgetProps.$widgetType,
      })
      prevEffectedDisplayNamesRef.current = []
    },
    [
      currentWidgetLayoutInfo.layoutInfo.minH,
      currentWidgetProps.$widgetType,
      dispatch,
      displayName,
      parentNodeDisplayName,
      unitW,
    ],
  )

  return (
    <Rnd
      bounds="parent"
      size={{
        width: widgetWidth,
        height: widgetHeight,
      }}
      position={{
        x: widgetLeft,
        y: widgetTop,
      }}
      css={applyRNDWrapperStyle(
        hasEditors,
        isSelected,
        isLikeProductionMode,
        isDragging,
      )}
      resizeGrid={[unitW, UNIT_HEIGHT]}
      style={{
        display: isDragging ? "none" : "inline-block",
      }}
      disableDragging
      enableResizing={
        isEditMode && isSelected && !isResizingWithOthers
          ? getEnableResizing(resizeDirection)
          : false
      }
      minWidth={DEFAULT_MIN_COLUMN * unitW}
      minHeight={currentWidgetLayoutInfo?.layoutInfo.minH * UNIT_HEIGHT}
      resizeHandleComponent={getResizeHandler(
        resizeDirection,
        isSelected,
        scaleState,
      )}
      onResizeStart={handleResizeStart}
      onResize={handleResize}
      onResizeStop={handleOnResizeStop}
    >
      {!isResizingWithOthers && (
        <>
          {children}
          {isEditMode &&
            isSelected &&
            !isDraggingStateInGlobal &&
            isAutoLimitedMode && (
              <AutoHeightWithLimitedContainer
                containerHeight={widgetHeight}
                displayName={displayName}
              />
            )}
        </>
      )}
    </Rnd>
  )
}
