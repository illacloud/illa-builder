import { cloneDeep } from "lodash"
import { Middleware } from "redux"
import { reportMessage } from "./reportMessage"

export const mixpanelReport: Middleware = (store) => (next) => (action) => {
  const { type } = action
  const typeList = type.split("/")
  const isRemoteAction = typeList[typeList.length - 1] === "remote"
  const prevRootState = cloneDeep(store.getState())
  const resp = next(action)
  if (!isRemoteAction) {
    reportMessage(prevRootState, store.getState(), action)
  }

  return resp
}
