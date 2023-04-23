import { ILLAWebsocket } from "@/api/ws/illaWS"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import store from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"
import { builderRequest } from "../http"
import { HTTP_REQUEST_PUBLIC_BASE_URL } from "../http/constant"
import { MovingMessageBin, Signal, Target } from "./ILLA_PROTO"
import { ILLABinaryWebsocket } from "./illaBinaryWS"
import {
  Broadcast,
  ILLAWebSocketComponentPayload,
  ILLA_WEBSOCKET_CONTEXT,
  Room,
  RoomType,
} from "./interface"

export function transformComponentReduxPayloadToWsPayload(
  componentNodes: ComponentNode[] | ComponentNode,
): ILLAWebSocketComponentPayload[] {
  if (Array.isArray(componentNodes)) {
    return componentNodes.map((node) => {
      return {
        before: {
          displayName: node.displayName,
        },
        after: node,
      }
    })
  }
  if (!componentNodes) return []
  return [
    {
      before: {
        displayName: componentNodes.displayName,
      },
      after: componentNodes,
    },
  ]
}

export function getTextMessagePayload<T>(
  signal: Signal,
  target: Target,
  broadcast: boolean,
  reduxBroadcast: Broadcast | null,
  teamID: string,
  uid: string,
  payload: T[],
): string {
  return JSON.stringify({
    signal,
    target,
    option: broadcast ? 1 : 0,
    broadcast: reduxBroadcast,
    payload,
    teamID,
    uid,
  })
}

export const getBinaryMessagePayload = (
  signal: Signal,
  target: Target,
  needBroadcast: boolean,
  userID: string,
  nickname: string,
  status: number,
  parentDisplayName: string,
  displayNames: string,
  cursorXInteger: number,
  cursorYInteger: number,
  cursorXMod: number,
  cursorYMod: number,
  widgetX: number,
  widgetY: number,
  widgetW: number,
  widgetH: number,
) => {
  const payloadObject: MovingMessageBin = {
    signal,
    target,
    clientID: "",
    needBroadcast,
    userID,
    nickname,
    status,
    parentDisplayName,
    displayNames,
    cursorXInteger,
    cursorYInteger,
    cursorXMod,
    cursorYMod,
    widgetX,
    widgetY,
    widgetW,
    widgetH,
  }
  const binMessage = MovingMessageBin.toBinary(payloadObject)
  return binMessage
}

export class Connection {
  static roomMap: Map<string, ILLAWebsocket | ILLABinaryWebsocket> = new Map()

  static async enterRoom(type: RoomType, roomId: string) {
    let wsContext = ILLA_WEBSOCKET_CONTEXT.DASHBOARD
    const protocol = isCloudVersion
      ? location.protocol
      : new URL(HTTP_REQUEST_PUBLIC_BASE_URL).protocol
    const wsProtocol = protocol === "https:" ? "wss://" : "ws://"
    const wsPREFIX = `${wsProtocol}${
      isCloudVersion
        ? location.host
        : new URL(HTTP_REQUEST_PUBLIC_BASE_URL).host
    }`
    switch (type) {
      case "dashboard": {
        wsContext = ILLA_WEBSOCKET_CONTEXT.DASHBOARD
        try {
          const response = await builderRequest<Room>(
            {
              url: `/room/websocketConnection/dashboard`,
              method: "GET",
            },
            {
              needTeamID: true,
            },
          )
          let wsURL = response.data.wsURL
          if (!isCloudVersion) {
            wsURL = `${wsPREFIX}${wsURL}`
          }
          let ws = generateTextMessageWs(wsURL, wsContext)
          this.roomMap.set(type + roomId, ws)
        } catch (_e) {}
        break
      }
      case "app":
        wsContext = ILLA_WEBSOCKET_CONTEXT.APP

        try {
          const textResponse = await builderRequest<Room>(
            {
              url: `/room/websocketConnection/app/${roomId}`,
              method: "GET",
            },
            {
              needTeamID: true,
            },
          )
          const binaryResponse = await builderRequest<Room>(
            {
              url: `/room/binaryWebsocketConnection/app/${roomId}`,
              method: "GET",
            },
            {
              needTeamID: true,
            },
          )
          let wsURL = textResponse.data.wsURL
          let binaryWSURL = binaryResponse.data.wsURL
          if (!isCloudVersion) {
            wsURL = `${wsPREFIX}${wsURL}`
            binaryWSURL = `${wsPREFIX}${binaryWSURL}`
          }
          let ws = generateTextMessageWs(wsURL, wsContext)
          let bindaryWS = generateBinaryMessageWs(binaryWSURL)
          this.roomMap.set(type + roomId, ws)
          this.roomMap.set(type + roomId + "/binary", bindaryWS)
        } catch (_e) {}

        break
    }
  }

  static getTextRoom(
    type: RoomType,
    roomId: string,
  ): ILLAWebsocket | undefined {
    return this.roomMap.get(type + roomId) as ILLAWebsocket
  }

  static getBinaryRoom(
    type: RoomType,
    roomId: string,
  ): ILLABinaryWebsocket | undefined {
    return this.roomMap.get(type + roomId + "/binary") as ILLABinaryWebsocket
  }

  static leaveRoom(type: RoomType, roomId: string) {
    const { id: teamID = "", uid = "" } =
      getCurrentTeamInfo(store.getState()) ?? {}
    let textWS = this.roomMap.get(type + roomId) as ILLAWebsocket
    let binaryWS = this.roomMap.get(type + roomId + "/binary")
    if (textWS != undefined) {
      textWS.send(
        getTextMessagePayload(
          Signal.LEAVE,
          Target.NOTHING,
          false,
          {
            type: "leave",
            payload: [],
          },
          teamID,
          uid,
          [],
        ),
      )
      binaryWS?.close()
      textWS.close()
    }
  }
}

export function generateTextMessageWs(
  url: string,
  context: ILLA_WEBSOCKET_CONTEXT,
) {
  return new ILLAWebsocket(url, context)
}

export function generateBinaryMessageWs(url: string) {
  return new ILLABinaryWebsocket(url, ILLA_WEBSOCKET_CONTEXT.APP_BINARY)
}
