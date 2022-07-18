import { AxiosRequestConfig } from "axios"
import qs from "qs"

let pendingPollMap = new Map<string, (reason?: any) => void>()

export const generateUniqueKey = (config: AxiosRequestConfig) =>
  [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join("/")

export const clearRequestPendingPool = () => {
  pendingPollMap.forEach((cancel) => {
    cancel?.()
  })
  pendingPollMap.clear()
}

export const removeRequestPendingPool = (config: AxiosRequestConfig) => {
  const key = generateUniqueKey(config)
  if (pendingPollMap.has(key)) {
    const cancel = pendingPollMap.get(key)
    cancel?.()
    pendingPollMap.delete(key)
  }
}

export const addRequestPendingPool = (config: AxiosRequestConfig) => {
  removeRequestPendingPool(config)
  const key = generateUniqueKey(config)
  const controller = new AbortController()
  config.signal = controller.signal
  if (!pendingPollMap.has(key)) {
    pendingPollMap.set(key, controller.abort.bind(controller))
  }
}
