import { createSlice } from "@reduxjs/toolkit"
import { actionInitialState } from "@/redux/currentApp/action/actionState"
import {
  updateActionListReducer,
  addActionItemReducer,
  removeActionItemReducer,
  updateActionItemReducer,
  updateActionTemplateReducer,
} from "@/redux/currentApp/action/actionReducer"

const actionSlice = createSlice({
  name: "action",
  initialState: actionInitialState,
  reducers: {
    updateActionListReducer,
    addActionItemReducer,
    updateActionItemReducer,
    removeActionItemReducer,
    updateActionTemplateReducer,
  },
})

export const actionActions = actionSlice.actions
export default actionSlice.reducer
