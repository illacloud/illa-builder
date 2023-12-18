import { Middleware, isAction } from "@reduxjs/toolkit"
import { guideUpdate } from "@/middleware/guideAsync/guideUpdate"
import { getGuideStatus } from "@/redux/guide/guideSelector"

export const guideAsync: Middleware = (store) => (next) => (action) => {
  if (!isAction(action) || !("payload" in action)) {
    return next(action)
  }
  const isGuideOpen = getGuideStatus(store.getState())
  if (isGuideOpen) {
    guideUpdate(store.getState(), store.dispatch, action)
  }
  return next(action)
}
