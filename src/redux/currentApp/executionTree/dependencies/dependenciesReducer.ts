import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  DependenciesState,
  SetDependenciesActionPayload,
} from "@/redux/currentApp/executionTree/dependencies/dependenciesState"
import { isObject } from "@/utils/typeHelper"

export const setDependenciesReducer: CaseReducer<
  DependenciesState,
  PayloadAction<SetDependenciesActionPayload>
> = (state, action) => {
  const { dependencies } = action.payload
  if (!isObject(dependencies)) return
  Object.keys(dependencies).forEach((key) => {
    state[key] = dependencies[key]
  })
}
