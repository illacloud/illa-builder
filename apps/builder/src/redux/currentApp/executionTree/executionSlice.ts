import { createSlice } from "@reduxjs/toolkit"
import { executionInitialState } from "@/redux/currentApp/executionTree/executionState"
import {
  setDependenciesReducer, setExecutionDebuggerDataReducer,
  setExecutionErrorReducer,
  setExecutionResultReducer,
  startExecutionReducer,
  updateExecutionByDisplayNameReducer,
} from "@/redux/currentApp/executionTree/executionReducer"

const executionSlice = createSlice({
  name: "execution",
  initialState: executionInitialState,
  reducers: {
    setDependenciesReducer,
    setExecutionResultReducer,
    setExecutionErrorReducer,
    setExecutionDebuggerDataReducer,
    startExecutionReducer,
    updateExecutionByDisplayNameReducer,
  },
})

export const executionActions = executionSlice.actions
export default executionSlice.reducer
