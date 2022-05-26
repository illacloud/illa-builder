import { createSlice } from "@reduxjs/toolkit"
import { WidgetDragResizeInitialState } from "./widgetStatesState"
import {
  focusWidget,
  selectMultipleWidgets,
  selectWidget,
  setDraggingOn,
  setNewWidgetDragging,
  setWidgetDragging,
  setWidgetResizing,
} from "./widgetStatesReducer"

const widgetStatesSlice = createSlice({
  name: "widgetStates",
  initialState: WidgetDragResizeInitialState,
  reducers: {
    setNewWidgetDragging,
    setWidgetDragging,
    setDraggingOn,
    setWidgetResizing,
    selectWidget,
    selectMultipleWidgets,
    focusWidget,
  },
})

export const widgetStatesActions = widgetStatesSlice.actions
export default widgetStatesSlice.reducer
