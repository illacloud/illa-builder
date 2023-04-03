import { createSlice } from "@reduxjs/toolkit"
import {
  deleteCursorReducer,
  leaveContainerReducer,
  removeAnimationEndCursorInfo,
  updateCursorReducer,
} from "./cursorReducer"
import { CursorInitialState } from "./cursorState"

const cursorSlice = createSlice({
  name: "cursor",
  initialState: CursorInitialState,
  reducers: {
    updateCursorReducer,
    deleteCursorReducer,
    removeAnimationEndCursorInfo,
    leaveContainerReducer,
  },
})

export const cursorActions = cursorSlice.actions
export default cursorSlice.reducer
