import WebSocket from "ws"
import { Api } from "@/api/base"

export type RoomType = "dashboard" | "app"

export interface Room {
  roomId: string
}

function generateDashboardWs(roomId: string): WebSocket {
  let ws = new WebSocket(
    `ws://${import.meta.env.BASE_URL}/room/dashboard/${roomId}`,
  )
  ws.on("close", () => {
    Connection.roomMap.delete(roomId)
  })
  ws.on("message", () => {})
  return ws
}

function generateAppWs(roomId: string): WebSocket {
  let ws = new WebSocket(`ws://${import.meta.env.BASE_URL}/room/app/${roomId}`)
  ws.on("close", () => {
    Connection.roomMap.delete(roomId)
  })
  ws.on("message", () => {})
  return ws
}

export class Connection {
  static roomMap: Map<string, WebSocket> = new Map()

  static enterRoom(
    type: RoomType,
    loading: (loading: boolean) => void,
    errorState: (errorState: boolean) => void,
    getRoom: (room: Room) => void,
  ) {
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
        getRoom(response.data)
      },
      (response) => {},
      () => {},
      loading,
      errorState,
    )
  }

  static leaveRoom(roomId: string) {
    let ws = this.roomMap.get(roomId)
    if (ws != undefined) {
      ws.close()
    }
  }
}
