import { createSlice } from "@reduxjs/toolkit"
import { DslInitialState } from "./dslState"
import { dslActionHandler, updateDslProps } from "./dslReducer"

const dslSlice = createSlice({
  name: "dsl",
  initialState: DslInitialState,
  reducers: {
    dslActionHandler,
    updateDslProps,
  },
})

export const dslActions = dslSlice.actions
export default dslSlice.reducer
