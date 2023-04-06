import { createSlice } from "@reduxjs/toolkit"
import {
  deleteDragShadowInfoReducer,
  filterDragShadowInfoReducer,
  leaveContainerDragShadowInfoReducer,
  removeAnimationEndDragShadowInfoReducer,
  resetDragShadowInfoReducer,
  updateDragShadowInfoReducer,
} from "./dragShadowReducer"
import { DragShadowInitialState } from "./dragShadowState"

const dragShadowSlice = createSlice({
  name: "dragShadow",
  initialState: DragShadowInitialState,
  reducers: {
    updateDragShadowInfoReducer,
    deleteDragShadowInfoReducer,
    removeAnimationEndDragShadowInfoReducer,
    leaveContainerDragShadowInfoReducer,
    resetDragShadowInfoReducer,
    filterDragShadowInfoReducer,
  },
})

export const dragShadowActions = dragShadowSlice.actions
export default dragShadowSlice.reducer
