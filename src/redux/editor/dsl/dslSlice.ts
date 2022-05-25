import { createSlice } from "@reduxjs/toolkit"
import { DslInitialState } from "./dslState"
import { dslActionHandler } from "./dslReducer"

const dslSlice = createSlice({
  name: "dsl",
  initialState: DslInitialState,
  reducers: {
    dslActionHandler,
  },
})

export const dslActions = dslSlice.actions
export default dslSlice.reducer
