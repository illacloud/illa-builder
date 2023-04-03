import { createSlice } from "@reduxjs/toolkit"
import { deleteCursorReducer, updateCursorReducer } from "./cursorReducer"
import { CursorInitialState } from "./cursorState"

const cursorSlice = createSlice({
  name: "cursor",
  initialState: CursorInitialState,
  reducers: { updateCursorReducer, deleteCursorReducer },
})

export const cursorActions = cursorSlice.actions
export default cursorSlice.reducer
