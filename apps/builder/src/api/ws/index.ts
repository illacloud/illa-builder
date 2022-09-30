import {
  Broadcast,
  Callback,
  ILLAWebSocket,
  ILLAWebSocketComponentPayload,
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
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

export function transformComponentReduxPayloadToWsPayload(
  componentNodes: ComponentNode[] | ComponentNode,
): ILLAWebSocketComponentPayload[] {
  if (Array.isArray(componentNodes)) {
    return componentNodes.map(node => {
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

export const wsMap = new Map()

export class Connection {
  static roomMap: Map<string, ILLAWebSocket> = new Map()

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
      response => {
        let ws = generateWs(response.data.wsURL)
        this.roomMap.set(type + roomId, ws)
      },
      error => {},
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
      ws.close(1000)
    }
  }
}

function onMessage(this: ILLAWebSocket, event: MessageEvent) {
  resetHeartbeat(this)
  const message = event.data
  if (typeof message !== "string") {
    return
  }

  const dataList = message.split("\n")
  dataList.forEach((data: string) => {
    let callback: Callback<unknown> = JSON.parse(data)
    if (callback.errorCode === 0) {
      if (callback.broadcast != null) {
        let broadcast = callback.broadcast
        let type = broadcast.type
        let payload = broadcast.payload
        switch (type) {
          case `${ADD_DISPLAY_NAME}/remote`: {
            ;(payload as string[]).forEach(name => {
              DisplayNameGenerator.displayNameList.add(name)
            })
            break
          }
          case `${REMOVE_DISPLAY_NAME}/remote`: {
            ;(payload as string[]).forEach(name => {
              DisplayNameGenerator.displayNameList.delete(name)
            })
            break
          }
          case `${UPDATE_DISPLAY_NAME}/remote`: {
            DisplayNameGenerator.displayNameList.delete(payload[0])
            DisplayNameGenerator.displayNameList.add(payload[1])
            break
          }
          default: {
            try {
              store.dispatch({
                type,
                payload,
              })
            } catch (ignore) {}
          }
        }
      }
    }
  })
}

function onError(this: ILLAWebSocket, event: Event) {
  console.error(`[WS ERROR](${this.url} is error)`, event)
  this.close(4000, "close with error")
}

function onClose(this: ILLAWebSocket, event: CloseEvent) {
  if (event.code !== 1000) {
    reconnect(this)
  } else {
    clearWSTimeout(this)
    wsMap.delete(this.url)
  }
  console.warn(`[WS CLOSED](${this.url}) ${event.code}:${event.reason}`)
}

function onOpen(this: ILLAWebSocket, event: Event) {
  this.offline = false
  startHeartbeat(this)
  console.log(`[WS OPENED](${this.url}) connection succeeded`)
  this.send(
    getPayload(Signal.SIGNAL_ENTER, Target.TARGET_NOTHING, false, null, [
      {
        authToken: getLocalStorage("token"),
      },
    ]),
  )
}

const HEARTBEAT_TIMEOUT = 2 * 1000
const HEARTBEAT_SERVER_TIMEOUT = 5 * 1000
const RECONNECT_TIMEOUT = 5 * 1000

function clearWSTimeout(ws: ILLAWebSocket) {
  ws.timeout && clearTimeout(ws.timeout)
  ws.serverTimeout && clearTimeout(ws.serverTimeout)
  ws.debounceTimeout && clearTimeout(ws.debounceTimeout)
}

const pingMessage = JSON.stringify({
  signal: 0,
  option: 0,
  target: 0,
  payload: [],
  broadcast: null,
})

function startHeartbeat(ws: ILLAWebSocket) {
  ws.timeout = setTimeout(() => {
    ws.send(pingMessage)
    ws.serverTimeout = setTimeout(() => {
      ws.offline = true
      // TODO:MESSAGE
      ws.close(4001)
    }, HEARTBEAT_SERVER_TIMEOUT)
  }, HEARTBEAT_TIMEOUT)
}

function resetHeartbeat(ws: ILLAWebSocket) {
  clearWSTimeout(ws)
  startHeartbeat(ws)
}

function reconnect(ws: ILLAWebSocket) {
  clearWSTimeout(ws)
  // const callNow = !ws.debounceTimeout
  // ws.debounceTimeout = setTimeout(() => {
  //   ws.debounceTimeout = null
  //   reconnect(ws)
  // }, RECONNECT_TIMEOUT)
  // if (callNow) {
  //   generateWs(ws.url)
  // }
}

function initWsConfig(ws: ILLAWebSocket) {
  ws.timeout = null
  ws.serverTimeout = null
  ws.debounceTimeout = wsMap.get(ws.url)
    ? wsMap.get(ws.url).debounceTimeout
    : null
  ws.offline = wsMap.get(ws.url) ? wsMap.get(ws.url).offline : false
  wsMap.set(ws.url, ws)
}

export function generateWs(url: string) {
  const ws: ILLAWebSocket = new WebSocket(url)
  ws.onopen = onOpen
  ws.onerror = onError
  ws.onclose = onClose
  ws.onmessage = onMessage
  initWsConfig(ws)
  return ws
}
