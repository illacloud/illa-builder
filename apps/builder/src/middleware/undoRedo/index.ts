import { Middleware } from "@reduxjs/toolkit"
import { REDUX_ACTION_FROM } from "./interface"
import { undoRedoMethod } from "./method"

export const UndoRedo: Middleware = (store) => (next) => (action) => {
  if (action.from && action.from === REDUX_ACTION_FROM.WS) {
    const resp = next(action)
    return resp
  }
  const prevRootState = store.getState()
  const resp = next(action)
  undoRedoMethod(prevRootState, resp, action)
  return resp
}
