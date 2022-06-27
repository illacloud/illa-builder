import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

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
