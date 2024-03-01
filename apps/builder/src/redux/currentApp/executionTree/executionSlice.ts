import { createSlice } from "@reduxjs/toolkit"
import {
  clearLocalStorageInExecutionReducer,
  resetExecutionResultReducer,
  setDependenciesReducer,
  setExecutionErrorReducer,
  setExecutionResultReducer,
  setGlobalStateInExecutionReducer,
  setInGlobalStateInExecutionReducer,
  setIndependenciesReducer,
  setLocalStorageInExecutionReducer,
  startExecutionReducer,
  updateCurrentPagePathReducer,
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
    setIndependenciesReducer,
    setExecutionResultReducer,
    setExecutionErrorReducer,
    startExecutionReducer,
    updateExecutionByDisplayNameReducer,
    updateExecutionByMultiDisplayNameReducer,
    updateModalDisplayReducer,
    resetExecutionResultReducer,
    setGlobalStateInExecutionReducer,
    setInGlobalStateInExecutionReducer,
    clearLocalStorageInExecutionReducer,
    setLocalStorageInExecutionReducer,
    updateCurrentPagePathReducer,
  },
})

export const executionActions = executionSlice.actions
export default executionSlice.reducer
