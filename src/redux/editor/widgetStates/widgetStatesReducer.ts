import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { MAIN_CONTAINER_ID } from "@/page/Editor/constants"
import { DraggingGroupCenter, WidgetDragResizeState } from "./widgetStatesState"

export const setNewWidgetDragging: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<{
    isDragging: boolean
    widgetProps: any
  }>
> = (state, action) => {
  const { isDragging, widgetProps } = action.payload
  state.isDragging = isDragging
  state.dragDetails = {
    newWidget: widgetProps,
    draggedOn: MAIN_CONTAINER_ID,
  }
}

export const setWidgetDragging: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<{
    isDragging: boolean
    dragGroupActualParent: string
    draggingGroupCenter: DraggingGroupCenter
    startPoints: any
  }>
> = (state, action) => {
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
}

export const setDraggingOn: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<{
    draggedOn: string
  }>
> = (state, action) => {
  state.dragDetails.draggedOn = action.payload.draggedOn
}

// resize
export const setWidgetResizing: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<boolean>
> = (state, action) => {
  state.isResizing = action.payload
}

// select
export const selectWidget: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<{ id?: string; isMultiSelect?: boolean }>
> = (state, action) => {
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
}

export const selectMultipleWidgets: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<{ ids?: string[] }>
> = (state, action) => {
  const { ids } = action.payload
  if (ids) {
    state.selectedWidgets = ids || []
    if (ids.length > 1) {
      state.lastSelectedWidget = ""
    } else {
      state.lastSelectedWidget = ids[0]
    }
  }
}

export const focusWidget: CaseReducer<
  WidgetDragResizeState,
  PayloadAction<{ id?: string }>
> = (state, action) => {
  state.focusedWidget = action.payload.id
}
