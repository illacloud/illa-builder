import { createSlice } from "@reduxjs/toolkit"
import {
  addActionItemReducer,
  batchUpdateMultiActionSlicePropsReducer,
  removeActionItemReducer,
  resetActionReducer,
  updateActionDisplayNameReducer,
  updateActionItemReducer,
  updateActionListReducer,
} from "@/redux/currentApp/action/actionReducer"
import { actionInitialState } from "@/redux/currentApp/action/actionState"

const actionSlice = createSlice({
  name: "action",
  initialState: actionInitialState,
  reducers: {
    updateActionListReducer,
    addActionItemReducer,
    updateActionItemReducer,
    removeActionItemReducer,
    resetActionReducer,
    updateActionDisplayNameReducer,
    batchUpdateMultiActionSlicePropsReducer,
  },
})

export const actionActions = actionSlice.actions
export default actionSlice.reducer
