import WebSocket from "ws"
import { Api } from "@/api/base"
import store from "@/store"
import { builderInfoActions } from "@/redux/builderInfo/builderSlice"

export type RoomType = "dashboard" | "app"

export interface Room {
  roomId: string
}

function generateDashboardWs(roomId: string): WebSocket {
  let ws = new WebSocket(
    `ws://${import.meta.env.BASE_URL}/room/dashboard/${roomId}`,
  )
  ws.on("close", () => {
    store.dispatch(builderInfoActions.updateConnectErrorReducer(true))
    Room.roomMap.delete(roomId)
  })
  return ws
}

function generateAppWs(roomId: string): WebSocket {
  let ws = new WebSocket(`ws://${import.meta.env.BASE_URL}/room/app/${roomId}`)
  ws.on("close", () => {
    store.dispatch(builderInfoActions.updateConnectErrorReducer(true))
    Room.roomMap.delete(roomId)
  })
  return ws
}

export class Room {
  static roomMap: Map<string, WebSocket> = new Map()

  static enterRoom(type: RoomType) {
    Api.request<Room>(
      {
        url: "/room",
        method: "get",
        params: {
          type: type,
        },
      },
      (response) => {
        switch (type) {
          case "app": {
            let ws = generateAppWs(response.data.roomId)
            this.roomMap.set(response.data.roomId, ws)
            break
          }
          case "dashboard": {
            let ws = generateDashboardWs(response.data.roomId)
            this.roomMap.set(response.data.roomId, ws)
            break
          }
        }
      },
      () => {},
      () => {},
      (loading: boolean) => {
        store.dispatch(builderInfoActions.updateConnectLoadingReducer(loading))
      },
      (errorState: boolean) => {
        store.dispatch(builderInfoActions.updateConnectErrorReducer(errorState))
      },
    )
  }

  static leaveRoom(roomId: string) {
    let ws = this.roomMap.get(roomId)
    if (ws != undefined) {
      ws.close()
      this.roomMap.delete(roomId)
    }
  }
}
