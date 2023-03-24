import { cloneDeep } from "lodash"
import * as Redux from "redux"
import { receiveMessage } from "./receiveMessages"
import { sendMessage } from "./sendMessage"

export const reduxAsync: Redux.Middleware = (store) => (next) => (action) => {
  const { type } = action
  const typeList = type.split("/")
  const isRemoteAction = typeList[typeList.length - 1] === "remote"
  const currentAppID = store.getState().currentApp.appInfo.appId ?? ""
  if (isRemoteAction) {
    receiveMessage(action, currentAppID)
    return next(action)
  }
  const prevRootState = cloneDeep(store.getState())
  const resp = next(action)
  try {
    sendMessage(prevRootState, store.getState(), action)
  } catch (e) {
    console.log(e)
  }
  return resp
}
