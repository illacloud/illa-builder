import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store from "@/store"

export const setGlobalDataIn = (params: {
  key: string
  path: string
  value: unknown
}) => {
  const { key, path } = params
  if (typeof key !== "string" || typeof path !== "string") return
  store.dispatch(executionActions.setInGlobalStateInExecutionReducer(params))
}

export const setGlobalDataValue = (params: { key: string; value: unknown }) => {
  const { key } = params
  if (typeof key !== "string") return
  store.dispatch(executionActions.setGlobalStateInExecutionReducer(params))
}
