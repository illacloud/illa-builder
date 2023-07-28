import { createSlice } from "@reduxjs/toolkit"
import {
  batchUpdateWidgetLayoutInfoReducer,
  clearLocalStorageInExecutionReducer,
  resetExecutionResultReducer,
  setDependenciesReducer,
  setDraggingNodeIDsReducer,
  setExecutionDebuggerDataReducer,
  setExecutionErrorReducer,
  setExecutionResultReducer,
  setGlobalStateInExecutionReducer,
  setInGlobalStateInExecutionReducer,
  setIndependenciesReducer,
  setLocalStorageInExecutionReducer,
  setResizingNodeIDsReducer,
  setWidgetLayoutInfoReducer,
  startExecutionReducer,
  updateCurrentPagePathReducer,
  updateExecutionByDisplayNameReducer,
  updateExecutionByMultiDisplayNameReducer,
  updateModalDisplayReducer,
  updateWidgetLayoutInfoReducer,
  updateWidgetLayoutInfoWhenChangeDisplayNameReducer,
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
    setWidgetLayoutInfoReducer,
    updateWidgetLayoutInfoReducer,
    batchUpdateWidgetLayoutInfoReducer,
    setGlobalStateInExecutionReducer,
    setInGlobalStateInExecutionReducer,
    clearLocalStorageInExecutionReducer,
    setLocalStorageInExecutionReducer,
    updateWidgetLayoutInfoWhenChangeDisplayNameReducer,
    setDraggingNodeIDsReducer,
    setResizingNodeIDsReducer,
    updateCurrentPagePathReducer,
  },
})

export const executionActions = executionSlice.actions
export default executionSlice.reducer
