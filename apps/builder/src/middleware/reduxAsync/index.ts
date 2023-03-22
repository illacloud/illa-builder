import { cloneDeep } from "lodash"
import * as Redux from "redux"
import { getGuideStatus } from "@/redux/guide/guideSelector"
import { receiveMessage } from "./receiveMessages"
import { sendMessage } from "./sendMessage"

export const reduxAsync: Redux.Middleware = (store) => (next) => (action) => {
  const { type } = action
  const typeList = type.split("/")
  const isRemoteAction = typeList[typeList.length - 1] === "remote"
  const currentAppID = store.getState().currentApp.appInfo.appId ?? ""
  const isGuideOpen = getGuideStatus(store.getState())
  if (isRemoteAction) {
    receiveMessage(action, currentAppID)
    return next(action)
  }
  const prevRootState = cloneDeep(store.getState())
  const resp = next(action)
  if (!isGuideOpen) {
    try {
      sendMessage(prevRootState, store.getState(), action)
    } catch (e) {
      console.log(e)
    }
  }
  return resp
}
