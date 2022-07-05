import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { DependenciesState } from "@/redux/currentApp/executionTree/dependencies/dependenciesState"

export const setDependenciesReducer: CaseReducer<
  DependenciesState,
  PayloadAction<DependenciesState>
> = (state, action) => {
  return action.payload
}
