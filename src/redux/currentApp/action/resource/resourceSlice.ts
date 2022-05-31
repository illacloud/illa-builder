import { createSlice } from "@reduxjs/toolkit"
import { resourceInitialState } from "@/redux/currentApp/action/resource/resourceState"
import { addResourceItemReducer } from "@/redux/currentApp/action/resource/resourceReducer"

const resourceSlice = createSlice({
  name: "actionList",
  initialState: resourceInitialState,
  reducers: {
    addResourceItemReducer,
  },
})

export default resourceSlice.reducer
