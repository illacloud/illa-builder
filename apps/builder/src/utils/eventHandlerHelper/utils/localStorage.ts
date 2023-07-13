import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store from "@/store"

export const clearLocalStorage = () => {
  store.dispatch(executionActions.clearLocalStorageInExecutionReducer())
}

export const setValueLocalStorage = (params: {
  key: string
  value: unknown
}) => {
  const { key } = params
  if (typeof key !== "string") return

  store.dispatch(executionActions.setLocalStorageInExecutionReducer(params))
}
