import WebSocket from "ws"
import { Callback, Room, RoomType, Signal, Target } from "./interface"
import store from "@/store"
import { AxiosRequestConfig } from "axios"
import { Api } from "@/api/base"
import { getLocalStorage } from "@/utils/storage"

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

function generateWs(wsUrl: string): WebSocket {
  let ws = new WebSocket(wsUrl)
  ws.on("close", () => {
    Connection.roomMap.delete(wsUrl)
  })
  ws.on(
    "message",
    (webSocket: WebSocket, data: WebSocket.RawData, isBinary: boolean) => {
      let callback: Callback<any> = JSON.parse(data.toString())
      if (callback.errorCode === 0) {
        let broadcast = callback.broadcast
        let type = broadcast.type
        let payload = broadcast.payload
        try {
          store.dispatch({
            type,
            payload: JSON.parse(payload),
          })
        } catch (ignore) {}
      }
    },
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
    let config: AxiosRequestConfig
    switch (type) {
      case "dashboard":
        config = {
          url: `/room/${instanceId}/dashboard`,
          method: "get",
        }
        break
      case "app":
        config = {
          url: `/room/${instanceId}/app/${roomId}`,
          method: "get",
        }
        break
      default:
        config = {}
        break
    }
    Api.request<Room>(
      config,
      (response) => {
        let ws = generateWs(response.data.wsURL)
        this.roomMap.set(type + roomId, ws)
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
  }

  static getRoom(type: RoomType, roomId: string): WebSocket | undefined {
    return this.roomMap.get(type + roomId)
  }

  static leaveRoom(type: RoomType, roomId: string) {
    let ws = this.roomMap.get(type + roomId)
    if (ws != undefined) {
      ws.send(getPayload(Signal.SIGNAL_LEAVE, Target.TARGET_NOTHING, false, []))
      ws.close()
    }
  }
}
