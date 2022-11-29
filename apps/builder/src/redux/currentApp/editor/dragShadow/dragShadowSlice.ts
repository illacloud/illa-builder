import { createSlice } from "@reduxjs/toolkit"
import { DragShadowInitialState } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import {
  addOrUpdateDragShadowReducer,
  removeDragShadowReducer,
  updateDragShadowReducer,
} from "@/redux/currentApp/editor/dragShadow/dragShadowReducer"

const dragShadowSlice = createSlice({
  name: "dragShadow",
  initialState: DragShadowInitialState,
  reducers: {
    updateDragShadowReducer,
    addOrUpdateDragShadowReducer,
    removeDragShadowReducer,
  },
})

export const dragShadowActions = dragShadowSlice.actions
export default dragShadowSlice.reducer
