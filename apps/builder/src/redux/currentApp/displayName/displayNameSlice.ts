import { createSlice } from "@reduxjs/toolkit"
import { DisplayNameInitialState } from "@/redux/currentApp/displayName/displayNameState"
import {
  addDisplayNameReducer,
  removeDisplayNameMultiReducer,
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
    removeDisplayNameMultiReducer,
  },
})

export const displayNameActions = displayNameSlice.actions
export default displayNameSlice.reducer
