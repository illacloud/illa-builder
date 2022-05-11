import { createSlice } from "@reduxjs/toolkit"
import { StateWithHistory } from "redux-undo"

export interface ModeState {
  isPreviewMode: boolean
}

const initialState: ModeState = {
  isPreviewMode: false,
}

const modeSlice = createSlice({
  name: "mode",
  initialState,
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
