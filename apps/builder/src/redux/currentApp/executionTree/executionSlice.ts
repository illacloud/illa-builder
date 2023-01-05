import { createSlice } from "@reduxjs/toolkit"
import {
  setDependenciesReducer,
  setExecutionDebuggerDataReducer,
  setExecutionErrorReducer,
  setExecutionResultReducer,
  startExecutionReducer,
  updateExecutionByDisplayNameReducer,
  updateExecutionByMultiDisplayNameReducer,
  updateModalDisplayReducer,
} from "@/redux/currentApp/executionTree/executionReducer"
import { executionInitialState } from "@/redux/currentApp/executionTree/executionState"

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
    updateExecutionByMultiDisplayNameReducer,
    updateModalDisplayReducer,
  },
})

export const executionActions = executionSlice.actions
export default executionSlice.reducer
