import { getTextMessagePayload } from "@/api/ws/index"
import {
  Callback,
  ILLA_WEBSOCKET_CONTEXT,
  ILLA_WEBSOCKET_STATUS,
} from "@/api/ws/interface"
import { getIsOnline } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import store from "@/store"
import {
  ADD_DISPLAY_NAME,
  DisplayNameGenerator,
  GENERATE_OR_UPDATE_DISPLAYNAME,
  REMOVE_DISPLAY_NAME,
  UPDATE_DISPLAY_NAME,
} from "@/utils/generators/generateDisplayName"
import { ILLABuilderStorage } from "@/utils/storage"
import { Signal, Target } from "./ILLA_PROTO"

const HEARTBEAT_PING_TIMEOUT = 2 * 1000
const HEARTBEAT_PONG_TIMEOUT = 5 * 1000
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

  constructor(url: string, context: ILLA_WEBSOCKET_CONTEXT) {
    this.url = url
    this.context = context
    this.createWebsocket()
  }

  private createWebsocket() {
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

  private initEventHandle() {
    if (this.ws) {
      this.ws.onclose = () => {
        this.reconnect()
        store.dispatch(
          configActions.updateWSStatusReducer({
            context: this.context,
            wsStatus: ILLA_WEBSOCKET_STATUS.CLOSED,
          }),
        )
      }
      this.ws.onerror = () => {
        this.reconnect()
        store.dispatch(
          configActions.updateWSStatusReducer({
            context: this.context,
            wsStatus: ILLA_WEBSOCKET_STATUS.FAILED,
          }),
        )
      }
      this.ws.onopen = () => {
        console.log(`[WS OPENED](${this.url}) connection succeeded`)
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
            Signal.ENTER,
            Target.NOTHING,
            false,
            {
              type: "enter",
              payload: [],
            },
            teamID,
            uid,
            [
              {
                authToken: ILLABuilderStorage.getLocalStorage("token"),
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
        this.onMessage(event)
        this.heartCheck()
      }
    }
  }

  private reconnect() {
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
      this.createWebsocket()
      this.lockReconnect = false
    }, RECONNECT_TIMEOUT)
  }

  private heartCheck() {
    this.heartReset()
    this.heartStart()
  }

  private heartStart() {
    if (this.forbidReconnect) return
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
    this.heartReset()
    this.ws?.close()
  }
  public onMessage(event: MessageEvent) {
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
      }
    })
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
