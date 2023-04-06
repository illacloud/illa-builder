import { BuilderApi } from "@/api/base"
import { ILLAWebsocket } from "@/api/ws/illaWS"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import store from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"
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

  static enterRoom(
    type: RoomType,
    roomId: string,
    loading: (loading: boolean) => void,
    errorState: (errorState: boolean) => void,
  ) {
    let wsContext = ILLA_WEBSOCKET_CONTEXT.DASHBOARD
    const wsProtocol = location.protocol === "https:" ? "wss://" : "ws://"
    const wsPREFIX = `${wsProtocol}${location.host}`
    switch (type) {
      case "dashboard": {
        wsContext = ILLA_WEBSOCKET_CONTEXT.DASHBOARD
        BuilderApi.teamRequest<Room>(
          {
            url: `/room/websocketConnection/dashboard`,
            method: "GET",
          },
          (response) => {
            let wsURL = response.data.wsURL
            if (!isCloudVersion) {
              wsURL = `${wsPREFIX}${wsURL}`
            }
            let ws = generateTextMessageWs(wsURL, wsContext)
            this.roomMap.set(type + roomId, ws)
          },
          (error) => {},
          () => {},
          loading,
          errorState,
        )
        break
      }
      case "app":
        wsContext = ILLA_WEBSOCKET_CONTEXT.APP
        BuilderApi.teamRequest<Room>(
          {
            url: `/room/websocketConnection/app/${roomId}`,
            method: "GET",
          },
          (response) => {
            let wsURL = response.data.wsURL
            if (!isCloudVersion) {
              wsURL = `${wsPREFIX}${wsURL}`
            }
            let ws = generateTextMessageWs(wsURL, wsContext)
            this.roomMap.set(type + roomId, ws)
          },
          (error) => {},
          () => {},
          loading,
          errorState,
        )
        BuilderApi.teamRequest<Room>(
          {
            url: `/room/binaryWebsocketConnection/app/${roomId}`,
            method: "GET",
          },
          (response) => {
            let wsURL = response.data.wsURL
            if (!isCloudVersion) {
              wsURL = `${wsPREFIX}${wsURL}`
            }
            let ws = generateBinaryMessageWs(wsURL)
            this.roomMap.set(type + roomId + "/binary", ws)
          },
          (error) => {},
          () => {},
          loading,
          errorState,
        )
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
    let ws = this.roomMap.get(type + roomId) as ILLAWebsocket
    if (ws != undefined) {
      ws.send(
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
      ws.close()
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
