import { AxiosRequestConfig } from "axios"
import { Api } from "@/api/base"
import { ILLAWebsocket } from "@/api/ws/illaWS"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
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
    let instanceId = import.meta.env.VITE_INSTANCE_ID
    let config: AxiosRequestConfig
    switch (type) {
      case "dashboard":
        config = {
          url: `/room/${instanceId}/dashboard`,
          method: "GET",
        }
        break
      case "app":
        config = {
          url: `/room/${instanceId}/app/${roomId}`,
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
    let ws = this.roomMap.get(type + roomId)
    if (ws != undefined) {
      ws.send(
        getPayload(Signal.SIGNAL_LEAVE, Target.TARGET_NOTHING, false, null, []),
      )
      ws.close()
    }
  }
}

export function generateNewWs(url: string) {
  return new ILLAWebsocket(url)
}
