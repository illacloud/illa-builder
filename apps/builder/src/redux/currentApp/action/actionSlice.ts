import { createSlice } from "@reduxjs/toolkit"
import {
  addActionItemReducer,
  removeActionItemReducer,
  resetActionReducer,
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
  },
})

export const actionActions = actionSlice.actions
export default actionSlice.reducer
