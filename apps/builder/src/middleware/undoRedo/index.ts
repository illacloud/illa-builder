import { Middleware } from "@reduxjs/toolkit"
import { cloneDeep } from "lodash"
import { REDUX_ACTION_FROM } from "./interface"
import { undoRedoMethod } from "./method"

export const UndoRedo: Middleware = (store) => (next) => (action) => {
  if (action.from && action.from === REDUX_ACTION_FROM.WS) {
    const resp = next(action)
    return resp
  }
  const prevRootState = cloneDeep(store.getState())
  const resp = next(action)
  const nextRootState = store.getState()
  undoRedoMethod(prevRootState, nextRootState, action)
  return resp
}
