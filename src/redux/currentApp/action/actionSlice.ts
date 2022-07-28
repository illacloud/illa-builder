import { createSlice } from "@reduxjs/toolkit"
import { actionInitialState } from "@/redux/currentApp/action/actionState"
import {
  addActionItemReducer,
  removeActionItemReducer,
  updateActionItemReducer,
  updateActionItemResultReducer,
  updateActionListReducer,
} from "@/redux/currentApp/action/actionReducer"

const actionSlice = createSlice({
  name: "action",
  initialState: actionInitialState,
  reducers: {
    updateActionListReducer,
    addActionItemReducer,
    updateActionItemReducer,
    removeActionItemReducer,
    updateActionItemResultReducer,
  },
})

export const actionActions = actionSlice.actions
export default actionSlice.reducer
