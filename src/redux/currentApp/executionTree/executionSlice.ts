import { createSlice } from "@reduxjs/toolkit"
import { executionInitialState } from "@/redux/currentApp/executionTree/executionState"
import {
  setDependenciesReducer,
  setExecutionErrorReducer,
  setExecutionResultReducer,
  startExecutionReducer,
} from "@/redux/currentApp/executionTree/executionReducer"

const executionSlice = createSlice({
  name: "execution",
  initialState: executionInitialState,
  reducers: {
    setDependenciesReducer,
    setExecutionResultReducer,
    setExecutionErrorReducer,
    startExecutionReducer,
  },
})

export const executionActions = executionSlice.actions
export default executionSlice.reducer
