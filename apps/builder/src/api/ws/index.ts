import { AxiosRequestConfig } from "axios"
import { BuilderApi } from "@/api/base"
import { ILLAWebsocket } from "@/api/ws/illaWS"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import store from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"
import {
  Broadcast,
  ILLAWebSocketComponentPayload,
  ILLA_WEBSOCKET_CONTEXT,
  Room,
  RoomType,
  Signal,
  Target,
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

export function getPayload<T>(
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

export class Connection {
  static roomMap: Map<string, ILLAWebsocket> = new Map()

  static enterRoom(
    type: RoomType,
    roomId: string,
    loading: (loading: boolean) => void,
    errorState: (errorState: boolean) => void,
  ) {
    let config: AxiosRequestConfig
    let wsContext = ILLA_WEBSOCKET_CONTEXT.DASHBOARD
    switch (type) {
      case "dashboard":
        config = {
          url: `/room/websocketConnection/dashboard`,
          method: "GET",
        }
        wsContext = ILLA_WEBSOCKET_CONTEXT.DASHBOARD
        break
      case "app":
        config = {
          url: `/room/websocketConnection/app/${roomId}`,
          method: "GET",
        }
        wsContext = ILLA_WEBSOCKET_CONTEXT.APP

        break
      default:
        config = {}
        break
    }

    BuilderApi.teamRequest<Room>(
      config,
      (response) => {
        let wsURL = response.data.wsURL
        if (!isCloudVersion) {
          wsURL =
            location.protocol === "https:"
              ? `wss://${location.host}${wsURL}`
              : `ws://${location.host}${wsURL}`
        }
        let ws = generateNewWs(wsURL, wsContext)
        this.roomMap.set(type + roomId, ws)
      },
      (error) => {},
      () => {},
      loading,
      errorState,
    )
  }

  static getRoom(type: RoomType, roomId: string): ILLAWebsocket | undefined {
    return this.roomMap.get(type + roomId)
  }

  static leaveRoom(type: RoomType, roomId: string) {
    const { id: teamID = "", uid = "" } =
      getCurrentTeamInfo(store.getState()) ?? {}
    let ws = this.roomMap.get(type + roomId)
    if (ws != undefined) {
      ws.send(
        getPayload(
          Signal.SIGNAL_LEAVE,
          Target.TARGET_NOTHING,
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

export function generateNewWs(url: string, context: ILLA_WEBSOCKET_CONTEXT) {
  return new ILLAWebsocket(url, context)
}
