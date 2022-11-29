import { createSlice } from "@reduxjs/toolkit"
import { resourceInitialState } from "@/redux/resource/resourceState"
import {
  updateResourceListReducer,
  addResourceItemReducer,
  updateResourceItemReducer,
  removeResourceItemReducer,
} from "@/redux/resource/resourceReducer"

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
