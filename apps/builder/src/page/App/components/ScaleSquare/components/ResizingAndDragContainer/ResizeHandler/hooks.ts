import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { throttle } from "lodash-es"
import { useCallback, useMemo, useRef } from "react"
import { XYCoord, useDrag, useDragLayer, useDrop } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { illaSnapshot } from "@/page/App/components/DotPanel/constant/snapshotNew"
import {
  NodeShape,
  getNewPositionWithCrossing,
} from "@/page/App/components/DotPanel/utils/crossingHelper"
import { sendShadowMessageHandler } from "@/page/App/components/DotPanel/utils/sendBinaryMessage"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import { layoutInfoActions } from "@/redux/currentApp/layoutInfo/layoutInfoSlice"
import {
  BatchUpdateWidgetLayoutInfoPayload,
  WidgetLayoutInfo,
} from "@/redux/currentApp/layoutInfo/layoutInfoState"
import store from "@/store"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { BarPosition } from "./interface"
import { fixWidgetPosition } from "./utils"

export interface DragResizeHandlerInfo {
  barPosition: BarPosition
  displayName: string
  dragResult?: NodeShape
}

export const useResizeStart = (
  barPosition: BarPosition,
  displayName: string,
) => {
  const dispatch = useDispatch()
  const useDragReturnValue = useDrag<DragResizeHandlerInfo>(
    () => ({
      type: "resizeHandler",
      end: () => {
        dispatch(configActions.updateShowDot(false))
      },
      item: () => {
        const rootState = store.getState()
        let allWidgetLayoutInfo = getClientWidgetLayoutInfo(rootState)
        illaSnapshot.setSnapshot(allWidgetLayoutInfo)
        dispatch(configActions.updateShowDot(true))
        dispatch(configActions.setResizingNodeIDsReducer([displayName]))

        return {
          barPosition,
          displayName,
        }
      },
    }),
    [barPosition, displayName],
  )

  return useDragReturnValue
}

export const useResize = () => {
  const isEditMode = useSelector(getIsILLAEditMode)

  const dispatch = useDispatch()
  const prevEffectedDisplayNamesRef = useRef<string[]>([])

  const useDropReturnValue = useDrop<DragResizeHandlerInfo>(
    () => ({
      accept: ["resizeHandler"],
      canDrop: () => {
        return isEditMode
      },
      hover: (dragHandlerInfo) => {
        const { displayName } = dragHandlerInfo

        const snapShot = illaSnapshot.getSnapshot()
        const currentWidgetSnapShot = snapShot[displayName]
        const scrollContainerDOM = document.querySelector(
          `[data-scroll-container="${currentWidgetSnapShot.parentNode}"]`,
        ) as HTMLElement
        if (!scrollContainerDOM) return
        scrollContainerDOM.dataset.isDraggingOver = "true"
      },

      drop: (dragHandlerInfo) => {
        const { displayName, dragResult } = dragHandlerInfo
        if (!dragResult) return

        const snapShot = illaSnapshot.getSnapshot()
        const currentWidgetSnapShot = snapShot[displayName]
        dispatch(
          componentsActions.updateComponentLayoutInfoReducer({
            displayName: displayName,
            layoutInfo: {
              x: dragResult.x,
              y: dragResult.y,
              w: dragResult.w,
              h:
                dragResult.h === currentWidgetSnapShot.layoutInfo.h
                  ? undefined
                  : dragResult.h,
            },
            parentNode: currentWidgetSnapShot.parentNode,
          }),
        )
        dispatch(configActions.setResizingNodeIDsReducer([]))

        sendShadowMessageHandler(-1, "", [], 0, 0, 0, 0, 0, 0, 0, 0)
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.DRAG, {
          element: "component",
          parameter1: currentWidgetSnapShot.widgetType,
        })
        prevEffectedDisplayNamesRef.current = []
        const scrollContainerDOM = document.querySelector(
          `[data-scroll-container="${currentWidgetSnapShot.parentNode}"]`,
        ) as HTMLElement
        if (!scrollContainerDOM) return
        scrollContainerDOM.dataset.isDraggingOver = "false"
      },
    }),
    [isEditMode],
  )

  return useDropReturnValue
}

interface ResizingCollectedProps {
  isDragging: boolean
  item: DragResizeHandlerInfo
  clientOffset: XYCoord | null
}

export const useResizingUpdateRealTime = (isActive: boolean) => {
  const prevEffectedDisplayNamesRef = useRef<string[]>([])
  const dispatch = useDispatch()

  const collectedProps = useDragLayer<
    ResizingCollectedProps,
    DragResizeHandlerInfo
  >((monitor) => {
    return {
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
      clientOffset: monitor.getClientOffset(),
    }
  })

  const throttleUpdateComponentPositionByReflow = useMemo(() => {
    return throttle((newItem: WidgetLayoutInfo) => {
      const snapshotMap = illaSnapshot.getSnapshot()
      const snapShotShape = snapshotMap[newItem.displayName]
      const effectMap = getNewPositionWithCrossing(
        {
          x: newItem.layoutInfo.x,
          y: newItem.layoutInfo.y,
          w: newItem.layoutInfo.w,
          h: newItem.layoutInfo.h,
        },
        newItem.parentNode,
        [newItem.displayName],
      )

      const updateSlice: BatchUpdateWidgetLayoutInfoPayload[] = [
        {
          displayName: newItem.displayName,
          layoutInfo:
            newItem.layoutInfo.h === snapShotShape.layoutInfo.h
              ? {
                  x: newItem.layoutInfo.x,
                  y: newItem.layoutInfo.y,
                  w: newItem.layoutInfo.w,
                }
              : {
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
      dispatch(
        layoutInfoActions.batchUpdateWidgetLayoutInfoReducer(updateSlice),
      )
    }, 16)
  }, [dispatch])

  const updateComponentResizeInfo = useCallback(
    (
      mousePositionInViewport: XYCoord,
      dragHandlerInfo: DragResizeHandlerInfo,
    ) => {
      const { barPosition, displayName } = dragHandlerInfo
      const snapShot = illaSnapshot.getSnapshot()
      const currentWidgetSnapShot = snapShot[displayName]
      if (!mousePositionInViewport || !currentWidgetSnapShot) return
      const parentNodeDisplayName = currentWidgetSnapShot.parentNode
      if (!parentNodeDisplayName) return
      const parentNodeDOM = document.querySelector(
        `[data-canvas-container="${parentNodeDisplayName}"]`,
      ) as HTMLElement
      const scrollContainerDOM = document.querySelector(
        `[data-scroll-container="${parentNodeDisplayName}"]`,
      ) as HTMLElement
      if (!parentNodeDOM || !scrollContainerDOM) return
      scrollContainerDOM.dataset.isDraggingOver = "true"
      const unitW = Number(parentNodeDOM.dataset.unitWidth)
      if (isNaN(unitW)) return
      const columnNumber = Number(parentNodeDOM.dataset.columnNumber)
      if (isNaN(columnNumber)) return
      const canvasRect = parentNodeDOM.getBoundingClientRect()
      const canvasTop = canvasRect.top
      const canvasLeft = canvasRect.left
      const mouseRelativeY = Math.round(
        (mousePositionInViewport.y - canvasTop) / UNIT_HEIGHT,
      )
      const mouseRelativeX = Math.round(
        (mousePositionInViewport.x - canvasLeft) / unitW,
      )

      const currentLayoutInfo = currentWidgetSnapShot.layoutInfo

      const deltaX =
        mouseRelativeX -
        (barPosition.includes("l")
          ? currentLayoutInfo.x
          : currentLayoutInfo.x + currentLayoutInfo.w)
      const deltaY =
        mouseRelativeY -
        (barPosition.includes("t")
          ? currentLayoutInfo.y
          : currentLayoutInfo.y + currentLayoutInfo.h)

      let widgetDeltaTop = 0
      let widgetDeltaHeight = 0

      if (barPosition.includes("t")) {
        widgetDeltaTop = deltaY
        widgetDeltaHeight = -deltaY
      }
      if (!barPosition.includes("t") && barPosition.includes("b")) {
        widgetDeltaHeight = deltaY
      }

      let widgetDeltaLeft = 0
      let widgetDeltaWidth = 0
      if (barPosition.includes("l")) {
        widgetDeltaLeft = deltaX
        widgetDeltaWidth = -deltaX
      }

      if (!barPosition.includes("l") && barPosition.includes("r")) {
        widgetDeltaWidth = deltaX
      }

      const resizeEffect = {
        x: widgetDeltaLeft,
        y: widgetDeltaTop,
        w: widgetDeltaWidth,
        h: widgetDeltaHeight,
      }

      const layoutInfoResult = {
        ...currentLayoutInfo,
        x: currentLayoutInfo.x + resizeEffect.x,
        y: currentLayoutInfo.y + resizeEffect.y,
        w: currentLayoutInfo.w + resizeEffect.w,
        h: currentLayoutInfo.h + resizeEffect.h,
      }

      const fixedLayoutInfoResult = fixWidgetPosition(
        layoutInfoResult,
        layoutInfoResult.minH,
        columnNumber,
      )

      const resizeDiff = {
        x: fixedLayoutInfoResult.x - currentLayoutInfo.x,
        y: fixedLayoutInfoResult.y - currentLayoutInfo.y,
        w: fixedLayoutInfoResult.w - currentLayoutInfo.w,
        h: fixedLayoutInfoResult.h - currentLayoutInfo.h,
      }

      if (resizeEffect.h && resizeEffect.h === -1 * resizeEffect.y) {
        if (Math.abs(resizeDiff.y) < Math.abs(resizeDiff.h)) {
          resizeDiff.h = -1 * resizeDiff.y
        } else {
          resizeDiff.y = -1 * resizeDiff.h
        }
      }

      if (resizeEffect.w) {
        if (resizeEffect.w === -1 * resizeEffect.x) {
          if (Math.abs(resizeDiff.x) < Math.abs(resizeDiff.w)) {
            resizeDiff.w = -1 * resizeDiff.x
          } else {
            resizeDiff.x = -1 * resizeDiff.w
          }
        } else {
          if (!resizeEffect.x) {
            resizeDiff.w += resizeDiff.x
            resizeDiff.x = 0
          }
        }
      }

      const dragResult = {
        x: currentLayoutInfo.x + resizeDiff.x,
        y: currentLayoutInfo.y + resizeDiff.y,
        w: currentLayoutInfo.w + resizeDiff.w,
        h: currentLayoutInfo.h + resizeDiff.h,
      }
      const resizeResult = {
        ...currentWidgetSnapShot,
        layoutInfo: {
          ...currentLayoutInfo,
          ...dragResult,
        },
      }

      dragHandlerInfo.dragResult = dragResult

      sendShadowMessageHandler(
        2,
        parentNodeDisplayName,
        [displayName],
        0,
        0,
        0,
        0,
        dragResult.x,
        dragResult.y,
        dragResult.w,
        dragResult.h,
      )

      throttleUpdateComponentPositionByReflow(resizeResult)
    },
    [throttleUpdateComponentPositionByReflow],
  )

  if (isActive && collectedProps.isDragging) {
    updateComponentResizeInfo(
      collectedProps.clientOffset ?? { x: 0, y: 0 },
      collectedProps.item,
    )
  }
}
