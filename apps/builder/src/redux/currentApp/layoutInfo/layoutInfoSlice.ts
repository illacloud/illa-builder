import { createSlice } from "@reduxjs/toolkit"
import {
  batchUpdateWidgetLayoutInfoReducer,
  setWidgetLayoutInfoReducer,
  updateWidgetLayoutInfoReducer,
  updateWidgetLayoutInfoWhenChangeDisplayNameReducer,
} from "./layoutInfoReducer"
import { layoutInfoInitialState } from "./layoutInfoState"

const layoutInfoSlice = createSlice({
  name: "layoutInfo",
  initialState: layoutInfoInitialState,
  reducers: {
    setWidgetLayoutInfoReducer,
    updateWidgetLayoutInfoReducer,
    batchUpdateWidgetLayoutInfoReducer,
    updateWidgetLayoutInfoWhenChangeDisplayNameReducer,
  },
})

export const layoutInfoActions = layoutInfoSlice.actions
export default layoutInfoSlice.reducer
