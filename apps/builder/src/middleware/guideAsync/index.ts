import { cloneDeep } from "lodash"
import { Middleware } from "redux"
import { guideUpdate } from "@/middleware/guideAsync/guideUpdate"
import { getGuideStatus } from "@/redux/guide/guideSelector"

export const guideAsync: Middleware = (store) => (next) => (action) => {
  const { type } = action
  const isGuideOpen = getGuideStatus(store.getState())
  const prevRootState = cloneDeep(store.getState())
  if (isGuideOpen) {
    guideUpdate(store.getState(), store.dispatch, action)
  }
  return next(action)
}
