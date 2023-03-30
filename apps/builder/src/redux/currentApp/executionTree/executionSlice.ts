import { createSlice } from "@reduxjs/toolkit"
import {
  batchUpdateWidgetLayoutInfoReducer,
  clearLocalStorageInExecutionReducer,
  resetExecutionResultReducer,
  setDependenciesReducer,
  setExecutionDebuggerDataReducer,
  setExecutionErrorReducer,
  setExecutionResultReducer,
  setGlobalStateInExecutionReducer,
  setInGlobalStateInExecutionReducer,
  setIndependenciesReducer,
  setLocalStorageInExecutionReducer,
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
    setIndependenciesReducer,
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
    setGlobalStateInExecutionReducer,
    setInGlobalStateInExecutionReducer,
    clearLocalStorageInExecutionReducer,
    setLocalStorageInExecutionReducer,
  },
})

export const executionActions = executionSlice.actions
export default executionSlice.reducer
