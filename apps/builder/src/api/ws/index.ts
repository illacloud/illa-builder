import { ILLAWebsocket } from "@/api/ws/illaWS"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import store from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"
import { HTTP_REQUEST_PUBLIC_BASE_URL } from "../http/constant"
import { MovingMessageBin, Signal, Target } from "./ILLA_PROTO"
import { ILLABinaryWebsocket } from "./illaBinaryWS"
import {
  Broadcast,
  ILLAWebSocketComponentPayload,
  ILLA_WEBSOCKET_CONTEXT,
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
  return MovingMessageBin.toBinary(payloadObject)
}

export const fixedWsURL = (wsURL: string) => {
  const protocol = isCloudVersion
    ? location.protocol
    : new URL(HTTP_REQUEST_PUBLIC_BASE_URL).protocol
  const wsProtocol = protocol === "https:" ? "wss://" : "ws://"
  const wsPREFIX = `${wsProtocol}${
    isCloudVersion ? location.host : new URL(HTTP_REQUEST_PUBLIC_BASE_URL).host
  }`
  if (!isCloudVersion) {
    wsURL = `${wsPREFIX}${wsURL}`
  }
  return wsURL
}

export class Connection {
  static roomMap: Map<string, ILLAWebsocket | ILLABinaryWebsocket> = new Map()

  static enterDashboardRoom(wsURL: string) {
    let ws = generateTextMessageWs(wsURL, ILLA_WEBSOCKET_CONTEXT.DASHBOARD)
    this.roomMap.set("dashboard/", ws)
  }

  static enterAppRoom(wsURL: string, binaryWsURL: string, appID: string) {
    let ws = generateTextMessageWs(wsURL, ILLA_WEBSOCKET_CONTEXT.APP)
    let binaryWs = generateBinaryMessageWs(binaryWsURL)
    this.roomMap.set(`app/${appID}`, ws)
    this.roomMap.set(`app/${appID}/binary`, binaryWs)
  }

  static getTextRoom(
    type: RoomType,
    roomId: string,
  ): ILLAWebsocket | undefined {
    return this.roomMap.get(`${type}/${roomId}`) as ILLAWebsocket
  }

  static getBinaryRoom(
    type: RoomType,
    roomId: string,
  ): ILLABinaryWebsocket | undefined {
    return this.roomMap.get(`${type}/${roomId}/binary`) as ILLABinaryWebsocket
  }

  static leaveRoom(type: RoomType, roomId: string) {
    const { id: teamID = "", uid = "" } =
      getCurrentTeamInfo(store.getState()) ?? {}
    let textWS = this.roomMap.get(`${type}/${roomId}`) as ILLAWebsocket
    let binaryWS = this.roomMap.get(`app/${roomId}/binary`)
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
      textWS.close()
    }
    if (binaryWS != undefined) {
      binaryWS.close()
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
