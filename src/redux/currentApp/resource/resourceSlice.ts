import { createSlice } from "@reduxjs/toolkit"
import { resourceInitialState } from "@/redux/currentApp/resource/resourceState"
import {
  addResourceItemReducer,
  updateResourceItemReducer,
} from "@/redux/currentApp/resource/resourceReducer"

const resourceSlice = createSlice({
  name: "actionList",
  initialState: resourceInitialState,
  reducers: {
    addResourceItemReducer,
    updateResourceItemReducer,
  },
})

export default resourceSlice.reducer
export const resourceActions = resourceSlice.actions
