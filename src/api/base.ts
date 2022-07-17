import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { clearLocalStorage, getLocalStorage } from "@/utils/storage"
import {
  addRequestPendingPool,
  removeRequestPendingPool,
} from "@/api/helpers/axiosPendingPool"
import { Message } from "@illa-design/message"

export interface Success {
  status: string // always ok
}

export interface ApiError {
  errorCode: string
  errorMessage: string
}
// TODO: @aruseito use OOP to create request
const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

axios.interceptors.request.use(
  (config) => {
    addRequestPendingPool(config)
    const token = getLocalStorage("token")
    if (token) {
      config.headers = {
        ...(config.headers ?? {}),
        Authorization: token,
      }
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

axios.interceptors.response.use(
  (response) => {
    const { config } = response
    removeRequestPendingPool(config)
    return response
  },
  (error: AxiosError) => {
    if (!window.navigator.onLine) {
      //  TODO: @aruseito handle offline,need message
      Message.warning("xxxxxxxx")
      return
    }
    const { response } = error
    if (response) {
      const { status } = response
      // TODO: @aruseito maybe need custom error status,because of we'll have plugin to request other's api
      if (status === 401) {
        clearLocalStorage()
        const { pathname } = location
        location.href = "/user/login?from=" + pathname || "/"
      } else if (status === 403) {
        location.href = "/403"
      } else if (status >= 500) {
        location.href = "/500"
      }
    }
    return Promise.reject(error)
  },
)

export class Api {
  static request<RespData, RequestBody = any, ErrorResp = ApiError>(
    config: AxiosRequestConfig<RequestBody>,
    success?: (response: AxiosResponse<RespData, RequestBody>) => void,
    failure?: (response: AxiosResponse<ErrorResp, RequestBody>) => void,
    crash?: (e: AxiosError) => void,
    loading?: (loading: boolean) => void,
    errorState?: (errorState: boolean) => void,
  ) {
    loading?.(true)
    errorState?.(false)
    axios
      .request<RespData, AxiosResponse<RespData>, RequestBody>(config)
      .then((response) => {
        loading?.(false)
        errorState?.(false)
        success?.(response)
      })
      .catch((error: AxiosError<ErrorResp, RequestBody>) => {
        loading?.(false)
        errorState?.(true)
        if (error.response) {
          failure?.(error.response)
        }
        if (error.response == undefined && error.request != undefined) {
          crash?.(error)
        }
      })
  }
}
