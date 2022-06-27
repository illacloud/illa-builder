import { createSlice } from "@reduxjs/toolkit"
import { DisplayNameInitialState } from "@/redux/currentApp/displayName/displayNameState"
import {
  addDisplayNameReducer,
  removeDisplayNameReducer,
} from "@/redux/currentApp/displayName/displayNameReducer"

const displayNameSlice = createSlice({
  name: "displayName",
  initialState: DisplayNameInitialState,
  reducers: { addDisplayNameReducer, removeDisplayNameReducer },
})

export const displayNameActions = displayNameSlice.actions
export default displayNameSlice.reducer
