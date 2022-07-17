import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { clearLocalStorage, getLocalStorage } from "@/utils/storage"

export interface Success {
  status: string // always ok
}

export interface ApiError {
  errorCode: string
  errorMessage: string
}

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

axios.interceptors.request.use(
  (config) => {
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
  (response) => response,
  (error) => {
    const { response } = error as AxiosError
    if (response) {
      const { status } = response
      if (status === 401) {
        clearLocalStorage()
        const { pathname } = location
        location.href = "/user/login?from=" + pathname
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

  static addResponseInterceptor<RespData, RespConfig>(
    resInterceptor?: (
      value: AxiosResponse<RespData, RespConfig>,
    ) => RespData | Promise<RespData>,
    errInterceptor?: (error: any) => any,
  ) {
    return axios.interceptors.response.use(resInterceptor, errInterceptor)
  }

  static removeResponseInterceptor(interceptor: number) {
    axios.interceptors.response.eject(interceptor)
  }
}
