import { cloneDeep, throttle } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Rnd, RndResizeCallback, RndResizeStartCallback } from "react-rnd"
import { getReflowResult } from "@/page/App/components/DotPanel/calc"
import {
  getIsILLAEditMode,
  getIsLikeProductMode,
  getSelectedComponents,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getComponentAttachUsers,
  getTargetCurrentUsersExpendMe,
} from "@/redux/currentApp/collaborators/collaboratorsSelector"
import { UpdateComponentNodeLayoutInfoPayload } from "@/redux/currentApp/editor/components/componentsPayload"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { RootState } from "@/store"
import { batchMergeLayoutInfoToComponent } from "@/utils/drag/drag"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { illaSnapshot } from "../../DotPanel/constant/snapshot"
import { getRealShapeAndPosition } from "../utils/getRealShapeAndPosition"
import { useScaleStateSelector } from "../utils/useScaleStateSelector"
import { ResizingContainerProps } from "./interface"
import { applyRNDWrapperStyle } from "./style"
import { getEnableResizing, getResizeHandler } from "./utils"

export const ResizingContainer: FC<ResizingContainerProps> = (props) => {
  const { unitW, unitH, componentNode, children, childrenNode, isDragging } =
    props

  const { minW, minH } = componentNode
  const dispatch = useDispatch()

  const isEditMode = useSelector(getIsILLAEditMode)
  const isLikeProductionMode = useSelector(getIsLikeProductMode)
  const selectedComponents = useSelector(getSelectedComponents)
  const executionResult = useSelector(getExecutionResult)
  const scaleState = useScaleStateSelector(componentNode.displayName)
  const hasEditors = useSelector<RootState, boolean>((rootState) => {
    const currentUserID = getCurrentUser(rootState).userId
    const componentsAttachedUsers = getComponentAttachUsers(rootState)
    return (
      getTargetCurrentUsersExpendMe(
        componentsAttachedUsers,
        componentNode.displayName,
        currentUserID,
      ).length > 0
    )
  })

  const { x, y, w, h } = getRealShapeAndPosition(componentNode, unitH, unitW)

  const resizeDirection = useMemo(() => {
    const direction =
      componentNode?.props?.resizeDirection ||
      widgetBuilder(componentNode.type).config?.resizeDirection
    return direction || RESIZE_DIRECTION.ALL
  }, [componentNode?.props, componentNode.type])

  const isSelected = useMemo(() => {
    return selectedComponents.some((displayName) => {
      return displayName === componentNode.displayName
    })
  }, [componentNode.displayName, selectedComponents])

  const throttleUpdateComponentPositionByReflow = useMemo(() => {
    return throttle((updateSlice: UpdateComponentNodeLayoutInfoPayload[]) => {
      dispatch(executionActions.batchUpdateWidgetLayoutInfoReducer(updateSlice))
    }, 60)
  }, [dispatch])

  const handleResizeStart: RndResizeStartCallback = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(configActions.updateResizingStateReducer(true))
      dispatch(
        componentsActions.updateComponentLayoutInfoReducer({
          displayName: componentNode.displayName,
          layoutInfo: {},
        }),
      )
      dispatch(
        componentsActions.batchUpdateComponentStatusInfoReducer([
          {
            displayName: componentNode.displayName,
            statusInfo: {
              isResizing: true,
            },
          },
        ]),
      )
      let mergedChildrenNode: ComponentNode[] = []
      if (Array.isArray(childrenNode)) {
        mergedChildrenNode = batchMergeLayoutInfoToComponent(
          executionResult,
          childrenNode,
        )
      }
      illaSnapshot.setSnapshot(mergedChildrenNode)

      dispatch(configActions.updateShowDot(true))
    },
    [childrenNode, componentNode.displayName, dispatch, executionResult],
  )

  const handleResize: RndResizeCallback = useCallback(
    (e, dir, elementRef, delta, position) => {
      const item = cloneDeep(componentNode)
      const { width, height } = delta
      const finalWidth = Math.round((w + width) / unitW)
      const finalHeight = Math.round((h + height) / unitH)
      const positionX = Math.round(position.x / unitW)
      const positionY = Math.round(position.y / unitH)
      const newItem = {
        ...item,
        x: positionX,
        y: positionY,
        w: finalWidth,
        h: finalHeight,
      }
      const snapshot = illaSnapshot.getSnapshot()
      const indexOfChildren = snapshot.findIndex(
        (node) => node.displayName === newItem.displayName,
      )
      const allChildrenNodes = [...snapshot]
      allChildrenNodes.splice(indexOfChildren, 1, newItem)
      const { finalState } = getReflowResult(newItem, allChildrenNodes)
      const updateSlice = finalState.map((componentNode) => {
        return {
          displayName: componentNode.displayName,
          layoutInfo: {
            x: componentNode.x,
            y: componentNode.y,
            w: componentNode.w,
            h: componentNode.h,
          },
        }
      })
      throttleUpdateComponentPositionByReflow(updateSlice)
    },
    [
      componentNode,
      throttleUpdateComponentPositionByReflow,
      h,
      unitH,
      unitW,
      w,
    ],
  )

  const handleOnResizeStop: RndResizeCallback = useCallback(
    (e, dir, ref, delta, position) => {
      dispatch(configActions.updateResizingStateReducer(false))

      const { width, height } = delta
      let finalWidth = Math.round((w + width) / unitW)
      let finalHeight = Math.round((h + height) / unitH)
      const x = Math.round(position.x / unitW)
      const y = Math.round(position.y / unitH)
      finalWidth =
        finalWidth < componentNode.minW ? componentNode.minW : finalWidth
      finalHeight =
        finalHeight < componentNode.minH ? componentNode.minH : finalHeight

      dispatch(
        componentsActions.updateComponentLayoutInfoReducer({
          displayName: componentNode.displayName,
          layoutInfo: {
            x,
            y,
            w: finalWidth,
            h: finalHeight,
          },
          options: {
            parentNode: componentNode.parentNode as string,
          },
        }),
      )
      dispatch(
        componentsActions.updateComponentStatusInfoReducer({
          displayName: componentNode.displayName,
          statusInfo: {
            isResizing: false,
          },
        }),
      )
      dispatch(configActions.updateShowDot(false))
    },
    [componentNode, dispatch, h, unitH, unitW, w],
  )

  return (
    <Rnd
      bounds="parent"
      size={{
        width: w,
        height: h,
      }}
      position={{
        x: x,
        y: y,
      }}
      css={applyRNDWrapperStyle(
        hasEditors,
        isSelected,
        isLikeProductionMode,
        isDragging,
      )}
      style={{
        display: isDragging ? "none" : "inline-block",
      }}
      disableDragging
      enableResizing={
        isEditMode && isSelected ? getEnableResizing(resizeDirection) : false
      }
      minWidth={minW * unitW}
      minHeight={minH * unitH}
      resizeHandleComponent={getResizeHandler(
        resizeDirection,
        isSelected,
        scaleState,
      )}
      onResizeStart={handleResizeStart}
      onResize={handleResize}
      onResizeStop={handleOnResizeStop}
    >
      {children}
    </Rnd>
  )
}
