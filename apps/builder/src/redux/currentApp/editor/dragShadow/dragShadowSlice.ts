import { createSlice } from "@reduxjs/toolkit"
import {
  addOrUpdateDragShadowReducer,
  removeDragShadowReducer,
  updateDragShadowReducer,
} from "@/redux/currentApp/editor/dragShadow/dragShadowReducer"
import { DragShadowInitialState } from "@/redux/currentApp/editor/dragShadow/dragShadowState"

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
