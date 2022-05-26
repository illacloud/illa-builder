import { createSlice } from "@reduxjs/toolkit"
import { resourceInititalState } from "@/redux/action/resource/resourceState"
import {
  addResourceItemReducer,
  updateResourceItemReducer,
} from "@/redux/action/resource/resourceReducer"

const resourceSlice = createSlice({
  name: "actionList",
  initialState: resourceInititalState,
  reducers: {
    addResourceItemReducer,
    updateResourceItemReducer,
  },
})

export default resourceSlice.reducer
export const resourceActions = resourceSlice.actions
