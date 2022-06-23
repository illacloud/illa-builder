import { createSlice } from "@reduxjs/toolkit"
import { resourceInitialState } from "@/redux/resource/resourceState"
import {
  addResourceListReducer,
  addResourceItemReducer,
  updateResourceItemReducer,
  removeResourceItemReducer,
} from "@/redux/resource/resourceReducer"

const resourceSlice = createSlice({
  name: "resource",
  initialState: resourceInitialState,
  reducers: {
    addResourceListReducer,
    addResourceItemReducer,
    updateResourceItemReducer,
    removeResourceItemReducer,
  },
})

export default resourceSlice.reducer
export const resourceActions = resourceSlice.actions
