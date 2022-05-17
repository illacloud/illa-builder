import { createSlice } from "@reduxjs/toolkit"
import { MAIN_CONTAINER_ID } from "../../../page/Editor/constants/dragConfig"

export type DraggingGroupCenter = {
  id?: string
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
      action: ReduxAction<{ id?: string; isMultiSelect?: boolean }>,
    ) {
      if (action.payload.id === MAIN_CONTAINER_ID) return
      if (action.payload.isMultiSelect) {
        const id = action.payload.id || ""
        const removeSelection = state.selectedWidgets.includes(id)
        if (removeSelection) {
          state.selectedWidgets = state.selectedWidgets.filter(
            (each) => each !== id,
          )
        } else if (!!id) {
          state.selectedWidgets = [...state.selectedWidgets, id]
        }
        if (state.selectedWidgets.length > 0) {
          state.lastSelectedWidget = removeSelection ? "" : id
        }
      } else {
        state.lastSelectedWidget = action.payload.id
        if (action.payload.id) {
          state.selectedWidgets = [action.payload.id]
        } else {
          state.selectedWidgets = []
        }
      }
    },
    selectMultipleWidgets(state, action: ReduxAction<{ ids?: string[] }>) {
      const { ids } = action.payload
      if (ids) {
        state.selectedWidgets = ids || []
        if (ids.length > 1) {
          state.lastSelectedWidget = ""
        } else {
          state.lastSelectedWidget = ids[0]
        }
      }
    },
    focusWidget(state, action: ReduxAction<{ id?: string }>) {
      state.focusedWidget = action.payload.id
    },
  },
})

export const widgetStatesActions = widgetStatesSlice.actions
export default widgetStatesSlice.reducer
