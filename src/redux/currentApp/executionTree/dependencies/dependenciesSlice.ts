import { createSlice } from "@reduxjs/toolkit"

import { dependenciesInitialState } from "@/redux/currentApp/executionTree/dependencies/dependenciesState"
import {
  setDependenciesReducer,
  startCalcReducer,
} from "@/redux/currentApp/executionTree/dependencies/dependenciesReducer"

const dependenciesSlice = createSlice({
  name: "dependencies",
  initialState: dependenciesInitialState,
  reducers: {
    setDependenciesReducer,
    startCalcReducer,
  },
})

export const dependenciesActions = dependenciesSlice.actions
export default dependenciesSlice.reducer
