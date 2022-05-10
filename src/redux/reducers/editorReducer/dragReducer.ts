import { createSlice } from "@reduxjs/toolkit"
import { StateWithHistory } from "redux-undo"

const initValue: dragState = {
  value: 101,
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

interface dragState {
  value: number
}

export type dragReduxState = StateWithHistory<dragState>
