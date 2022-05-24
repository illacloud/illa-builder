import { createSlice } from "@reduxjs/toolkit"
import { resourceInititalState } from "@/redux/action/resource/resourceState"
import { addResourceItemReducer } from "@/redux/action/resource/resourceReducer"

const resourceSlice = createSlice({
  name: "actionList",
  initialState: resourceInititalState,
  reducers: {
    addResourceItemReducer,
  },
})

export default resourceSlice.reducer
