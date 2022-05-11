import { createSlice } from "@reduxjs/toolkit"

const modeSlice = createSlice({
  name: "mode",
  initialState: {
    isPreviewMode: false,
  },
  reducers: {
    setPreviewMode(state, action) {
      return {
        ...state,
        isPreviewMode: action.payload,
      }
    },
  },
})

export const modeActions = modeSlice.actions
export default modeSlice.reducer
