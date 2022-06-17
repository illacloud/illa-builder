import { createSlice } from "@reduxjs/toolkit"
import { actionInitialState } from "@/redux/currentApp/action/actionState"
import {
  addActionListReducer,
  addActionItemReducer,
  removeActionItemReducer,
  updateActionItemReducer,
} from "@/redux/currentApp/action/actionReducer"

const actionSlice = createSlice({
  name: "action",
  initialState: actionInitialState,
  reducers: {
    addActionListReducer,
    addActionItemReducer,
    updateActionItemReducer,
    removeActionItemReducer,
  },
})

export const actionActions = actionSlice.actions
export default actionSlice.reducer
