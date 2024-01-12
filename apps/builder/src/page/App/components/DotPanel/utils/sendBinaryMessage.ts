import { getCurrentUser } from "@illa-public/user-data"
import { throttle } from "lodash-es"
import { Connection, getBinaryMessagePayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/ILLA_PROTO"
import { ILLARoute } from "@/router"
import store from "@/store"

export const sendMousePosition = (
  parentDisplayName: string,
  cursorXInteger: number,
  cursorYInteger: number,
  cursorXMod: number,
  cursorYMod: number,
  isLeave: boolean = false,
) => {
  if (cursorXInteger < 0 || cursorYInteger < 0) return
  const appID = ILLARoute.state.matches[0].params.appId
  const currentUserInfo = getCurrentUser(store.getState())
  if (!appID || !currentUserInfo.userID) return
  const ws = Connection.getBinaryRoom("app", appID)
  const binMessage = getBinaryMessagePayload(
    Signal.MOVE_CURSOR,
    Target.CURSOR,
    true,
    currentUserInfo.userID,
    currentUserInfo.nickname,
    isLeave ? -1 : 1,
    parentDisplayName,
    "",
    cursorXInteger,
    cursorYInteger,
    cursorXMod,
    cursorYMod,
    0,
    0,
    0,
    0,
  )
  ws?.send(binMessage)
}

export const sendMousePositionHandler = throttle(sendMousePosition, 50, {
  leading: true,
  trailing: true,
})

export const sendShadowPosition = (
  status: number,
  parentDisplayName: string,
  displayNames: string[],
  cursorXInteger: number,
  cursorYInteger: number,
  cursorXMod: number,
  cursorYMod: number,
  widgetX: number,
  widgetY: number,
  widgetW: number,
  widgetH: number,
) => {
  if (
    cursorXInteger < 0 ||
    cursorYInteger < 0 ||
    widgetX < 0 ||
    widgetY < 0 ||
    widgetW < 0 ||
    widgetH < 0
  )
    return
  const appID = ILLARoute.state.matches[0].params.appId
  const currentUserInfo = getCurrentUser(store.getState())
  if (!appID || !currentUserInfo.userID) return
  const ws = Connection.getBinaryRoom("app", appID)
  const binMessage = getBinaryMessagePayload(
    Signal.MOVE_STATE,
    Target.COMPONENTS,
    true,
    currentUserInfo.userID,
    currentUserInfo.nickname,
    status,
    parentDisplayName,
    displayNames.join(","),
    cursorXInteger,
    cursorYInteger,
    cursorXMod,
    cursorYMod,
    widgetX,
    widgetY,
    widgetW,
    widgetH,
  )
  ws?.send(binMessage)
}

export const sendShadowMessageHandler = throttle(sendShadowPosition, 50, {
  leading: true,
  trailing: true,
})
