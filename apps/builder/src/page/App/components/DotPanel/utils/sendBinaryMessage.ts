import { throttle } from "lodash"
import { Connection, getBinaryMessagePayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/ILLA_PROTO"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { ILLARoute } from "@/router"
import store from "@/store"

export const sendMousePosition = (
  parentDisplayName: string,
  x: number,
  y: number,
  w: number,
  h: number,
  isLeave: boolean = false,
) => {
  const appID = ILLARoute.state.matches[0].params.appId
  const rootState = store.getState()
  const currentUserInfo = getCurrentUser(rootState)
  if (!appID || !currentUserInfo.userId) return
  const ws = Connection.getBinaryRoom("app", appID)
  const binMessage = getBinaryMessagePayload(
    Signal.MOVE_CURSOR,
    Target.CURSOR,
    true,
    currentUserInfo.userId,
    currentUserInfo.nickname,
    isLeave ? -1 : 1,
    parentDisplayName,
    "",
    x,
    y,
    w,
    h,
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
  x: number,
  y: number,
  w: number,
  h: number,
) => {
  const appID = ILLARoute.state.matches[0].params.appId
  const rootState = store.getState()
  const currentUserInfo = getCurrentUser(rootState)
  if (!appID || !currentUserInfo.userId) return
  const ws = Connection.getBinaryRoom("app", appID)
  const binMessage = getBinaryMessagePayload(
    Signal.MOVE_STATE,
    Target.COMPONENTS,
    true,
    currentUserInfo.userId,
    currentUserInfo.nickname,
    status,
    parentDisplayName,
    displayNames.join(","),
    x,
    y,
    w,
    h,
  )
  ws?.send(binMessage)
}

export const sendShadowMessageHandler = throttle(sendShadowPosition, 50, {
  leading: true,
  trailing: true,
})
