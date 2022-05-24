import { createSlice } from "@reduxjs/toolkit"
import { actionInitialItem } from "@/redux/action/actionList/actionListState"
import {
  addActionItemReducer,
  removeActionItemReducer,
  updateActionItemReducer,
} from "@/redux/action/actionList/actionListReducer"

const actionListSlice = createSlice({
  name: "actionList",
  initialState: actionInitialItem,
  reducers: {
    addActionItemReducer,
    updateActionItemReducer,
    removeActionItemReducer,
  },
})

export default actionListSlice.reducer
