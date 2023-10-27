import { getCurrentTeamInfo } from "@illa-public/user-data"
import { getAuthToken } from "@illa-public/utils"
import { getTextMessagePayload } from "@/api/ws/index"
import {
  Callback,
  ILLA_WEBSOCKET_CONTEXT,
  ILLA_WEBSOCKET_STATUS,
} from "@/api/ws/interface"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import { getIsOnline } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import store from "@/store"
import {
  ADD_DISPLAY_NAME,
  DisplayNameGenerator,
  GENERATE_OR_UPDATE_DISPLAYNAME,
  REMOVE_DISPLAY_NAME,
  UPDATE_DISPLAY_NAME,
} from "@/utils/generators/generateDisplayName"

const HEARTBEAT_PING_TIMEOUT = 10 * 1000
const HEARTBEAT_PONG_TIMEOUT = 10 * 1000
const RECONNECT_TIMEOUT = 5 * 1000
const REPEAT_LIMIT = 5
const MESSAGE_QUEUE_MAX_LENGTH = 20

const pingMessage = JSON.stringify({
  signal: 0,
  option: 0,
  target: 0,
  payload: [],
  broadcast: null,
})

export interface WSMessageListener {
  onMessage: (
    event: MessageEvent,
    context: ILLA_WEBSOCKET_CONTEXT,
    ws: ILLAWebsocket,
  ) => void
  onError?: (context: ILLA_WEBSOCKET_CONTEXT, ws: ILLAWebsocket) => void
  onClosed?: (context: ILLA_WEBSOCKET_CONTEXT, ws: ILLAWebsocket) => void
}

export const ReduxMessageListener: WSMessageListener = {
  onMessage: (
    event: MessageEvent,
    context: ILLA_WEBSOCKET_CONTEXT,
    ws: ILLAWebsocket,
  ) => {
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
              ;(payload as string[]).forEach((name) => {
                DisplayNameGenerator.displayNameList.add(name)
              })
              break
            }
            case `${REMOVE_DISPLAY_NAME}/remote`: {
              ;(payload as string[]).forEach((name) => {
                DisplayNameGenerator.displayNameList.delete(name)
              })
              break
            }
            case `${UPDATE_DISPLAY_NAME}/remote`: {
              DisplayNameGenerator.displayNameList.delete(payload[0])
              DisplayNameGenerator.displayNameList.add(payload[1])
              break
            }
            case `${GENERATE_OR_UPDATE_DISPLAYNAME}/remote`: {
              DisplayNameGenerator.displayNameList.add(payload)
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
      } else if (callback.errorCode === 14) {
        // signal for recover app snapshot
        store.dispatch(
          configActions.updateWSStatusReducer({
            context: context,
            wsStatus: ILLA_WEBSOCKET_STATUS.LOCKING,
          }),
        )
        ws.reconnect()
      }
    })
  },
}

export class ILLAWebsocket {
  url: string
  ws: WebSocket | null = null
  repeat: number = 0
  lockReconnect: boolean = false
  forbidReconnect: boolean = false
  pingTimeoutId: number = -1
  pongTimeoutId: number = -1
  isOnline: boolean = getIsOnline(store.getState())
  messageQueue: string[] = []
  status: ILLA_WEBSOCKET_STATUS = ILLA_WEBSOCKET_STATUS.INIT
  context: ILLA_WEBSOCKET_CONTEXT = ILLA_WEBSOCKET_CONTEXT.DASHBOARD
  listeners: WSMessageListener[] = []

  constructor(url: string, context: ILLA_WEBSOCKET_CONTEXT) {
    this.url = url
    this.context = context
  }

  public initWebsocket() {
    try {
      store.dispatch(
        configActions.updateWSStatusReducer({
          context: this.context,
          wsStatus: ILLA_WEBSOCKET_STATUS.CONNECTING,
        }),
      )
      this.ws = new WebSocket(this.url)
      this.initEventHandle()
    } catch (e) {
      this.reconnect()
      throw e
    }
  }

  public registerListener(listener: WSMessageListener) {
    this.listeners.push(listener)
  }

  public unRegisterListener(listener: WSMessageListener) {
    const index = this.listeners.findIndex((value) => value === listener)
    if (index != -1) {
      this.listeners.splice(index, 1)
    }
  }

  public clearListener() {
    if (this.ws) {
      this.ws.onclose = null
      this.ws.onerror = null
      this.ws.onopen = null
      this.ws.onmessage = null
    }
    this.listeners = []
  }

  private initEventHandle() {
    if (this.ws) {
      this.ws.onclose = () => {
        store.dispatch(
          configActions.updateWSStatusReducer({
            context: this.context,
            wsStatus: ILLA_WEBSOCKET_STATUS.CLOSED,
          }),
        )
        this.listeners.forEach((listener) => {
          listener.onClosed?.(this.context, this)
        })
        this.reconnect()
      }
      this.ws.onerror = () => {
        store.dispatch(
          configActions.updateWSStatusReducer({
            context: this.context,
            wsStatus: ILLA_WEBSOCKET_STATUS.FAILED,
          }),
        )
        this.listeners.forEach((listener) => {
          listener.onError?.(this.context, this)
        })
        this.reconnect()
      }
      this.ws.onopen = () => {
        const { id: teamID = "", uid = "" } =
          getCurrentTeamInfo(store.getState()) ?? {}
        store.dispatch(configActions.updateDevicesOnlineStatusReducer(true))
        store.dispatch(
          configActions.updateWSStatusReducer({
            context: this.context,
            wsStatus: ILLA_WEBSOCKET_STATUS.CONNECTED,
          }),
        )

        this.send(
          getTextMessagePayload(
            TextSignal.ENTER,
            TextTarget.NOTHING,
            false,
            {
              type: "enter",
              payload: [],
            },
            teamID,
            uid,
            [
              {
                authToken: getAuthToken(),
              },
            ],
          ),
        )
        this.isOnline = true
        this.repeat = 0
        this.heartCheck()
        while (this.messageQueue.length > 0) {
          this.send(this.messageQueue.shift() as string)
        }
      }
      this.ws.onmessage = (event) => {
        this.listeners.forEach((listener) => {
          listener.onMessage(event, this.context, this)
        })
        this.heartCheck()
      }
    }
  }

  public reconnect() {
    if (this.forbidReconnect) return
    if (this.isOnline) {
      store.dispatch(configActions.updateDevicesOnlineStatusReducer(false))
      this.isOnline = false
    }
    if (REPEAT_LIMIT <= this.repeat) return
    if (this.lockReconnect) return
    this.lockReconnect = true
    this.repeat++
    setTimeout(() => {
      this.initWebsocket()
      this.lockReconnect = false
    }, RECONNECT_TIMEOUT)
  }

  private heartCheck() {
    this.heartReset()
    this.heartStart()
  }

  private heartStart() {
    if (this.forbidReconnect) {
      return
    }
    this.pingTimeoutId = window.setTimeout(() => {
      this.ws?.send(pingMessage)
      this.pongTimeoutId = window.setTimeout(() => {
        if (this.isOnline) {
          store.dispatch(configActions.updateDevicesOnlineStatusReducer(false))
          this.isOnline = false
        }
        this.ws?.close()
      }, HEARTBEAT_PONG_TIMEOUT)
    }, HEARTBEAT_PING_TIMEOUT)
  }

  private heartReset() {
    clearTimeout(this.pingTimeoutId)
    clearTimeout(this.pongTimeoutId)
  }

  public close() {
    this.forbidReconnect = true
    this.clearListener()
    this.heartReset()
    this.ws?.close()
  }

  public send(message: string) {
    if (this.ws?.readyState !== 1) {
      this.messageQueue.push(message)
      while (this.messageQueue.length > MESSAGE_QUEUE_MAX_LENGTH) {
        this.messageQueue.shift()
      }
      return
    }
    try {
      this.ws?.send(message)
    } catch (e) {
      console.error(e)
    }
  }
}
