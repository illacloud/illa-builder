import { createSlice } from "@reduxjs/toolkit"

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    isPreviewMode: false,
  },
  reducers: {
    setPreviewMode(state, action) {
      return {
        ...state,
        isPreviewMode: action.payload,
      };
    },
  },
})

export const editorActions = editorSlice.actions
export default editorSlice.reducer
