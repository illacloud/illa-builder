import { createSlice } from "@reduxjs/toolkit"
import undoable from "redux-undo"

const initValue: demoReduxState = {
  name: "demo name",
  value: {
    a: 1,
    b: [1, 2, 3],
    c: {
      value: "demo value",
    },
  },
}
const demoSlice = createSlice({
  name: "demo",
  initialState: initValue,
  reducers: {
    changeDemoValueA(state) {
      state.value.a++
    },
    changeDemoValueB(state) {
      state.value.b.push(4)
    },
    changeDemoValueC(state) {
      state.value.c.value = "demo C"
    },
  },
})

export const { changeDemoValueA, changeDemoValueB, changeDemoValueC } =
  demoSlice.actions

export default undoable(demoSlice.reducer)

export interface demoReduxState {
  name: string
  value: {
    a: number
    b: number[]
    c: {
      value: string
    }
  }
}