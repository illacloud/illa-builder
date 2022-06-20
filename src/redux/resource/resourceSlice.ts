import { createSlice } from "@reduxjs/toolkit"
import { resourceInitialState } from "@/redux/resource/resourceState"
import {
  addResourceListReducer,
  addResourceItemReducer,
  updateResourceItemReducer,
} from "@/redux/resource/resourceReducer"

const resourceSlice = createSlice({
  name: "resource",
  initialState: resourceInitialState,
  reducers: {
    addResourceListReducer,
    addResourceItemReducer,
    updateResourceItemReducer,
  },
})

export default resourceSlice.reducer
export const resourceActions = resourceSlice.actions
