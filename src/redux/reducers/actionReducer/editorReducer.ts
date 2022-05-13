import { createSlice } from "@reduxjs/toolkit"

export interface EditorState {
  queryId: string
}

const initialState: EditorState = {
  queryId: ""
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateQueryId(state, action) {
      state.queryId = action.payload
    }
  }
})

export const { updateQueryId } = editorSlice.actions

export default editorSlice.reducer;
