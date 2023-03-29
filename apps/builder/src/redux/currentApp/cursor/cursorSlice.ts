import { createSlice } from "@reduxjs/toolkit"
import {
  deleteCursorReducer,
  filterCursorReducer,
  leaveContainerReducer,
  removeAnimationEndCursorInfo,
  resetCursorReducer,
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
    resetCursorReducer,
    filterCursorReducer,
  },
})

export const cursorActions = cursorSlice.actions
export default cursorSlice.reducer
