import {
  Broadcast,
  Callback,
  Room,
  RoomType,
  Signal,
  Target,
} from "./interface"
import store from "@/store"
import { AxiosRequestConfig } from "axios"
import { Api } from "@/api/base"
import { getLocalStorage } from "@/utils/storage"
import {
  ADD_DISPLAY_NAME,
  DisplayNameGenerator,
  REMOVE_DISPLAY_NAME,
  UPDATE_DISPLAY_NAME,
} from "@/utils/generators/generateDisplayName"

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
    payload,
    broadcast: reduxBroadcast,
  })
}

function generateWs(wsUrl: string): WebSocket {
  const ws = new WebSocket(wsUrl)
  ws.onclose = () => {
    Connection.roomMap.delete(wsUrl)
  }
  ws.onmessage = (event) => {
    const message = event.data
    if (typeof message !== "string") {
      return
    }
    const dataList = message.split("\n")
    dataList.forEach((data: string) => {
      let callback: Callback<any> = JSON.parse(data)
      if (callback.errorCode === 0) {
        if (callback.broadcast != null) {
          let broadcast = callback.broadcast
          let type = broadcast.type
          let payload = broadcast.payload
          switch (type) {
            case `${ADD_DISPLAY_NAME}/remote`:
              ;(payload as string[]).forEach((name) => {
                DisplayNameGenerator.displayNameList.add(name)
              })
              break
            case `${REMOVE_DISPLAY_NAME}/remote`:
              ;(payload as string[]).forEach((name) => {
                DisplayNameGenerator.displayNameList.delete(name)
              })
              break
            case `${UPDATE_DISPLAY_NAME}/remote`:
              DisplayNameGenerator.displayNameList.delete(payload[0])
              DisplayNameGenerator.displayNameList.add(payload[1])
              break
            default:
              try {
                store.dispatch({
                  type,
                  payload,
                })
              } catch (ignore) {}
          }
        }
      }
    })
  }
  ws.onopen = () => {
    ws.send(
      getPayload(Signal.SIGNAL_ENTER, Target.TARGET_NOTHING, false, null, [
        {
          authToken: getLocalStorage("token"),
        },
      ]),
    )
  }
  return ws
}

export class Connection {
  static roomMap: Map<string, WebSocket> = new Map()

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
        let ws = generateWs(response.data.wsURL)
        this.roomMap.set(type + roomId, ws)
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
      ws.send(
        getPayload(Signal.SIGNAL_LEAVE, Target.TARGET_NOTHING, false, null, []),
      )
      ws.close()
    }
  }
}
