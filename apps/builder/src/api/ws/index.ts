import { AxiosRequestConfig } from "axios"
import { Api } from "@/api/base"
import { ILLAWebsocket } from "@/api/ws/illaWS"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getCurrentId, getCurrentTeamInfo } from "@/redux/team/teamSelector"
import store from "@/store"
import {
  Broadcast,
  ILLAWebSocketComponentPayload,
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
    const teamId = getCurrentId(store.getState())
    let instanceId = import.meta.env.VITE_INSTANCE_ID
    let config: AxiosRequestConfig
    switch (type) {
      case "dashboard":
        config = {
          url: `/room/websocketConnection/dashboard`,
          method: "GET",
        }
        break
      case "app":
        config = {
          url: `/room/websocketConnection/app/${roomId}`,
          method: "GET",
        }
        break
      default:
        config = {}
        break
    }
    Api.request<Room>(
      config,
      (response) => {
        let ws = generateNewWs(response.data.wsURL)
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

export function generateNewWs(url: string) {
  return new ILLAWebsocket(url)
}
