import { createSlice } from "@reduxjs/toolkit"
import { ResourceInititalState } from "@/redux/action/resource/resourceState"
import { addResourceItemReducer } from "@/redux/action/resource/resourceReducer"

const resourceSlice = createSlice({
  name: "actionList",
  initialState: ResourceInititalState,
  reducers: {
    addResourceItemReducer,
  },
})

export default resourceSlice.reducer
