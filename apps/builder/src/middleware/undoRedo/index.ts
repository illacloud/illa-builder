import { Middleware, isAction } from "@reduxjs/toolkit"
import { REDUX_ACTION_FROM } from "./interface"
import { undoRedoMethod } from "./method"

export const UndoRedo: Middleware = (store) => (next) => (action) => {
  if (!isAction(action) || !("payload" in action)) {
    return next(action)
  }
  if ("from" in action && action.from && action.from === REDUX_ACTION_FROM.WS) {
    const resp = next(action)
    return resp
  }
  const prevRootState = store.getState()
  const resp = next(action)
  const nextRootState = store.getState()
  undoRedoMethod(prevRootState, nextRootState, action)
  return resp
}
