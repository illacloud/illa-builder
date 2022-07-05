import { createSlice } from "@reduxjs/toolkit"
import { DisplayNameInitialState } from "@/redux/currentApp/displayName/displayNameState"
import {
  addDisplayNameReducer,
  removeDisplayNameReducer,
  updateDisplayNameReducer,
} from "@/redux/currentApp/displayName/displayNameReducer"

const displayNameSlice = createSlice({
  name: "displayName",
  initialState: DisplayNameInitialState,
  reducers: {
    updateDisplayNameReducer,
    addDisplayNameReducer,
    removeDisplayNameReducer,
  },
})

export const displayNameActions = displayNameSlice.actions
export default displayNameSlice.reducer
