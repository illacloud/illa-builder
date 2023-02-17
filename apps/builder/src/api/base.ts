// eslint-disable-next-line import/no-named-as-default
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import {
  authInterceptor,
  axiosErrorInterceptor,
  fullFillInterceptor,
} from "@/api/interceptors"
import { getCurrentId } from "@/redux/team/teamSelector"
import store from "@/store"
import { getTeamID } from "@/utils/team"
import { isCloudVersion } from "@/utils/typeHelper"

export interface Success {
  status: string // always ok
}

export interface ApiError {
  errorCode: string | number
  errorMessage: string
}

const BUILDER = "/builder/api/v1"

// TODO: @aruseito use OOP to create request
const axios = Axios.create({
  baseURL: `${location.protocol}//${
    import.meta.env.VITE_API_BASE_URL
  }${BUILDER}`,
  timeout: 10000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

axios.interceptors.request.use(authInterceptor, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use(fullFillInterceptor, axiosErrorInterceptor)

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
    const teamId = getTeamID()
    axios
      .request<RespData, AxiosResponse<RespData>, RequestBody>({
        ...config,
        url: `/teams/${teamId}` + config.url,
        timeout: 30000,
      })
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

export class BuilderBaseApi {
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
      .request<RespData, AxiosResponse<RespData>, RequestBody>({
        ...config,
        timeout: 30000,
      })
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
