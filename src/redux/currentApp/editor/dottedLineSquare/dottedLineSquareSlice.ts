import { createSlice } from "@reduxjs/toolkit"
import { DottedLineSquareInitialState } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareState"
import {
  addOrUpdateDottedLineSquareReducer,
  removeDottedLineSquareReducer,
} from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareReducer"

const dottedLineSquareSlice = createSlice({
  name: "dottedLineSquare",
  initialState: DottedLineSquareInitialState,
  reducers: {
    addOrUpdateDottedLineSquareReducer,
    removeDottedLineSquareReducer,
  },
})

export const dottedLineSquareActions = dottedLineSquareSlice.actions
export default dottedLineSquareSlice.reducer
