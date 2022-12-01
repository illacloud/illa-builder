import { createSlice } from "@reduxjs/toolkit"
import {
  addResourceItemReducer,
  removeResourceItemReducer,
  updateResourceItemReducer,
  updateResourceListReducer,
} from "@/redux/resource/resourceReducer"
import { resourceInitialState } from "@/redux/resource/resourceState"

const resourceSlice = createSlice({
  name: "resource",
  initialState: resourceInitialState,
  reducers: {
    updateResourceListReducer,
    addResourceItemReducer,
    updateResourceItemReducer,
    removeResourceItemReducer,
  },
})

export default resourceSlice.reducer
export const resourceActions = resourceSlice.actions
