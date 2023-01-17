import { getPayload } from "@/api/ws/index"
import { Callback, Signal, Target } from "@/api/ws/interface"
import { getIsOnline } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import store from "@/store"
import {
  ADD_DISPLAY_NAME,
  DisplayNameGenerator,
  REMOVE_DISPLAY_NAME,
  UPDATE_DISPLAY_NAME,
} from "@/utils/generators/generateDisplayName"
import { getLocalStorage } from "@/utils/storage"

const HEARTBEAT_PING_TIMEOUT = 2 * 1000
const HEARTBEAT_PONG_TIMEOUT = 5 * 1000
const RECONNECT_TIMEOUT = 5 * 1000
const REPEAT_LIMIT = 5

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

  constructor(url: string) {
    this.url = url
    this.createWebsocket()
  }

  private createWebsocket() {
    try {
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
      }
      this.ws.onerror = () => {
        this.reconnect()
      }
      this.ws.onopen = () => {
        console.log(`[WS OPENED](${this.url}) connection succeeded`)
        store.dispatch(configActions.updateDevicesOnlineStatusReducer(true))
        this.send(
          getPayload(
            Signal.SIGNAL_ENTER,
            Target.TARGET_NOTHING,
            false,
            {
              type: "enter",
              payload: [],
            },
            [
              {
                authToken: getLocalStorage("token"),
              },
            ],
          ),
        )
        this.isOnline = true
        this.repeat = 0
        this.heartCheck()
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
    try {
      this.ws?.send(message)
    } catch (e) {
      console.error(e)
    }
  }
}
