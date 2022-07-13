import WebSocket from "ws"
import { Api } from "@/api/base"
import { getLocalStorage } from "@/utils/storage"
import { Room, RoomType, Signal, Target } from "./interface"

export function getPayload<T>(
  signal: Signal,
  target: Target,
  broadcast: boolean,
  payload: T[],
): string {
  return JSON.stringify({
    signal,
    target,
    broadcast,
    payload,
  })
}

function generateDashboardWs(wsUrl: string): WebSocket {
  let ws = new WebSocket(wsUrl)
  ws.on("close", () => {
    Connection.roomMap.delete(wsUrl)
  })
  ws.on(
    "message",
    (webSocket: WebSocket, data: WebSocket.RawData, isBinary: boolean) => {},
  )
  return ws
}

function generateAppWs(wsUrl: string): WebSocket {
  let ws = new WebSocket(wsUrl)
  ws.on("close", () => {
    Connection.roomMap.delete(wsUrl)
  })
  ws.on(
    "message",
    (webSocket: WebSocket, data: WebSocket.RawData, isBinary: boolean) => {},
  )
  return ws
}

export class Connection {
  static roomMap: Map<string, WebSocket> = new Map()

  static enterRoom(
    type: RoomType,
    roomId: string,
    loading: (loading: boolean) => void,
    errorState: (errorState: boolean) => void,
    getRoom: (room: Room) => void,
  ) {
    let instanceId = import.meta.env.VITE_INSTANCE_ID
    switch (type) {
      case "dashboard":
        Api.request<Room>(
          {
            url: `/room/${instanceId}/dashboard`,
            method: "get",
          },
          (response) => {
            let ws = generateDashboardWs(response.data.wsURL)
            this.roomMap.set(response.data.wsURL, ws)
            getRoom(response.data)
            ws.send(
              getPayload(Signal.SIGNAL_ENTER, Target.TARGET_NOTHING, false, [
                {
                  authToken: getLocalStorage("token"),
                },
              ]),
            )
          },
          (error) => {},
          () => {},
          loading,
          errorState,
        )
        break
      case "app":
        Api.request<Room>(
          {
            url: `/room/${instanceId}/app/${roomId}`,
            method: "get",
          },
          (response) => {
            let ws = generateAppWs(response.data.wsURL)
            this.roomMap.set(response.data.wsURL, ws)
            getRoom(response.data)
            ws.send(
              getPayload(Signal.SIGNAL_ENTER, Target.TARGET_NOTHING, false, [
                {
                  authToken: getLocalStorage("token"),
                },
              ]),
            )
          },
          (error) => {},
          () => {},
          loading,
          errorState,
        )
        break
      default:
        break
    }
  }

  static getRoom(wsURL: string): WebSocket | undefined {
    return this.roomMap.get(wsURL)
  }

  static leaveRoom(roomId: string) {
    let ws = this.roomMap.get(roomId)
    if (ws != undefined) {
      ws.send(getPayload(Signal.SIGNAL_LEAVE, Target.TARGET_NOTHING, false, []))
      ws.close()
    }
  }
}
