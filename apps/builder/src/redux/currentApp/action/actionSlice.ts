import { createSlice } from "@reduxjs/toolkit"
import {
  addActionItemReducer,
  batchUpdateMultiActionSlicePropsReducer,
  batchUpdateResourceID,
  initActionListReducer,
  removeActionItemReducer,
  resetActionReducer,
  updateActionDisplayNameReducer,
  updateActionItemReducer,
} from "@/redux/currentApp/action/actionReducer"
import { actionInitialState } from "@/redux/currentApp/action/actionState"

const actionSlice = createSlice({
  name: "action",
  initialState: actionInitialState,
  reducers: {
    initActionListReducer,
    addActionItemReducer,
    updateActionItemReducer,
    removeActionItemReducer,
    resetActionReducer,
    updateActionDisplayNameReducer,
    batchUpdateMultiActionSlicePropsReducer,
    batchUpdateResourceID,
  },
})

export const actionActions = actionSlice.actions
export default actionSlice.reducer
