import { createSlice } from "@reduxjs/toolkit"
import { DragShadowInitialState } from "@/redux/currentApp/editor/dragShadow/dragShadowState"
import { addOrUpdateDragShadowReducer } from "@/redux/currentApp/editor/dragShadow/dragShadowReducer"

const dragShadowSlice = createSlice({
  name: "dragShadow",
  initialState: DragShadowInitialState,
  reducers: {
    addOrUpdateDragShadowReducer,
  },
})

export const dragShadowActions = dragShadowSlice.actions
export default dragShadowSlice.reducer
