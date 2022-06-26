import { createSlice } from "@reduxjs/toolkit"

import { executionInitialState } from "@/redux/currentApp/executionTree/execution/executionState"
import { setExecutionReducer } from "@/redux/currentApp/executionTree/execution/executionReducer"

const executionSlice = createSlice({
  name: "execution",
  initialState: executionInitialState,
  reducers: {
    setExecutionReducer,
  },
})

export const executionActions = executionSlice.actions
export default executionSlice.reducer
