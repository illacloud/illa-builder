import { createSlice } from "@reduxjs/toolkit"
import { StateWithHistory } from "redux-undo"

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
        draggedOn: "root",
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
    setWidgetResizing(state, action) {
      state.isResizing = action.payload
    },
  },
})

export type WidgetStatesReduxState = StateWithHistory<WidgetDragResizeState>
export const widgetStatesActions = widgetStatesSlice.actions
export default widgetStatesSlice.reducer
