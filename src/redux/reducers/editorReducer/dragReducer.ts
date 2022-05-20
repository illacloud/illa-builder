import { createSlice } from "@reduxjs/toolkit"

const initValue: DragState = {
  value: 101,
  githubData: {},
}

const dragSlice = createSlice({
  name: "drag",
  initialState: initValue,
  reducers: {
    increaseDragValue(state) {
      state.value++
    },
  },
})

export const { increaseDragValue } = dragSlice.actions

export default dragSlice.reducer

export interface DragState {
  value: number
  githubData: any
}
