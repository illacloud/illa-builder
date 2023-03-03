import { createSlice } from "@reduxjs/toolkit"
import {
  batchUpdateWidgetLayoutInfoReducer,
  resetExecutionResultReducer,
  setDependenciesReducer,
  setExecutionDebuggerDataReducer,
  setExecutionErrorReducer,
  setExecutionResultReducer,
  startExecutionReducer,
  updateExecutionByDisplayNameReducer,
  updateExecutionByMultiDisplayNameReducer,
  updateModalDisplayReducer,
  updateWidgetLayoutInfoReducer,
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
    resetExecutionResultReducer,
    updateWidgetLayoutInfoReducer,
    batchUpdateWidgetLayoutInfoReducer,
  },
})

export const executionActions = executionSlice.actions
export default executionSlice.reducer
