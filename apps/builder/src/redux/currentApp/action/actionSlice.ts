import { createSlice } from "@reduxjs/toolkit"
import {
  addActionItemReducer,
  removeActionItemReducer,
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
  },
})

export const actionActions = actionSlice.actions
export default actionSlice.reducer
