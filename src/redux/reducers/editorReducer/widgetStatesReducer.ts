import { createSlice } from "@reduxjs/toolkit"
import { MAIN_CONTAINER_ID } from "../../../page/Editor/constants/dragConfig"

export type DraggingGroupCenter = {
  widgetId?: string
  top?: number
  left?: number
}

export interface DragDetails {
  dragGroupActualParent?: string
  draggingGroupCenter?: DraggingGroupCenter
  newWidget?: any
  draggedOn?: string
  dragOffset?: any
}

export interface WidgetDragResizeState {
  isDraggingDisabled: boolean
  isDragging: boolean
  dragDetails: DragDetails
  isResizing: boolean
  lastSelectedWidget?: string
  focusedWidget?: string
  selectedWidgetAncestry: string[]
  selectedWidgets: string[]
}

export interface ReduxAction<T> {
  type: any
  payload: T
}

const widgetStatesSlice = createSlice({
  name: "widgetStates",
  initialState: {
    isDraggingDisabled: false,
    isDragging: false,
    dragDetails: {},
    isResizing: false,
    lastSelectedWidget: undefined,
    selectedWidgets: [],
    focusedWidget: undefined,
    selectedWidgetAncestry: [],
  } as WidgetDragResizeState,
  reducers: {
    setNewWidgetDragging(
      state: WidgetDragResizeState,
      action: ReduxAction<{
        isDragging: boolean
        widgetProps: any
      }>,
    ) {
      const { isDragging, widgetProps } = action.payload

      state.isDragging = isDragging
      state.dragDetails = {
        newWidget: widgetProps,
        draggedOn: MAIN_CONTAINER_ID,
      }
    },
    setWidgetDragging(
      state: WidgetDragResizeState,
      action: ReduxAction<{
        isDragging: boolean
        dragGroupActualParent: string
        draggingGroupCenter: DraggingGroupCenter
        startPoints: any
      }>,
    ) {
      const {
        isDragging,
        dragGroupActualParent,
        draggingGroupCenter,
        startPoints,
      } = action.payload

      state.isDragging = isDragging
      state.dragDetails = {
        dragGroupActualParent,
        draggingGroupCenter,
        dragOffset: startPoints,
      }
    },
    setDraggingOn(
      state: WidgetDragResizeState,
      action: ReduxAction<{
        draggedOn: string
      }>,
    ) {
      state.dragDetails.draggedOn = action.payload.draggedOn
    },
    // resize
    setWidgetResizing(state, action) {
      state.isResizing = action.payload
    },
    // select
    selectWidget(
      state,
      action: ReduxAction<{ widgetId?: string; isMultiSelect?: boolean }>,
    ) {
      if (action.payload.widgetId === MAIN_CONTAINER_ID) return
      if (action.payload.isMultiSelect) {
        const widgetId = action.payload.widgetId || ""
        const removeSelection = state.selectedWidgets.includes(widgetId)
        if (removeSelection) {
          state.selectedWidgets = state.selectedWidgets.filter(
            (each) => each !== widgetId,
          )
        } else if (!!widgetId) {
          state.selectedWidgets = [...state.selectedWidgets, widgetId]
        }
        if (state.selectedWidgets.length > 0) {
          state.lastSelectedWidget = removeSelection ? "" : widgetId
        }
      } else {
        state.lastSelectedWidget = action.payload.widgetId
        if (action.payload.widgetId) {
          state.selectedWidgets = [action.payload.widgetId]
        } else {
          state.selectedWidgets = []
        }
      }
    },
    selectMultipleWidgets (
      state,
      action: ReduxAction<{ widgetIds?: string[] }>,
    ) {
      const { widgetIds } = action.payload;
      if (widgetIds) {
        state.selectedWidgets = widgetIds || [];
        if (widgetIds.length > 1) {
          state.lastSelectedWidget = "";
        } else {
          state.lastSelectedWidget = widgetIds[0];
        }
      }
    },
    focusWidget(
      state,
      action: ReduxAction<{ widgetId?: string }>,
    ) {
      state.focusedWidget = action.payload.widgetId
    },
  },
})

export const widgetStatesActions = widgetStatesSlice.actions
export default widgetStatesSlice.reducer
