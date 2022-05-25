import { createSlice } from "@reduxjs/toolkit"
import { modeInitialState } from "@/redux/editor/mode/modeState"
import { setPreviewMode } from "@/redux/editor/mode/modeReducer"

const modeSlice = createSlice({
  name: "mode",
  initialState: modeInitialState,
  reducers: {
    setPreviewMode,
  },
})

export const modeActions = modeSlice.actions
export default modeSlice.reducer
