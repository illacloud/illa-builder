// eslint-disable-next-line import/no-named-as-default
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import {
  addRequestPendingPool,
  removeRequestPendingPool,
} from "@/api/helpers/axiosPendingPool"
import {
  authInterceptor,
  axiosErrorInterceptor,
  fullFillInterceptor,
} from "@/api/interceptors"
import { ILLARoute } from "@/router"
import { cloudUrl } from "@/router/routerConfig"
import { getAuthToken, removeAuthToken } from "@/utils/auth"
import { getTeamID } from "@/utils/team"
import { isCloudVersion } from "@/utils/typeHelper"

export interface Success {
  status: string // always ok
}

export interface ApiError {
  errorCode: string | number
  errorMessage: string
}

export const BUILDER = "/builder/api/v1"
export const CLOUD = "/supervisor/api/v1"

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

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    addRequestPendingPool(config)
    const token = getAuthToken()
    if (typeof token === "string") {
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
  (response: AxiosResponse) => {
    const { config } = response
    removeRequestPendingPool(config)
    return response
  },
  (error: AxiosError) => {
    const { response } = error
    if (!response) return Promise.reject(error)
    const { status } = response
    switch (status) {
      // TODO: @aruseito maybe need custom error status, because of we'll have plugin to request other's api
      case 401: {
        removeAuthToken()
        if (isCloudVersion) {
          // navigate to illa cloud
          ILLARoute.navigate(cloudUrl)
        } else {
          const { pathname } = location
          ILLARoute.navigate("/user/login", {
            replace: true,
            state: {
              form: pathname || "/",
            },
          })
        }
        break
      }
      case 403: {
        ILLARoute.navigate("/403", {
          replace: true,
        })
        break
      }
      case 500: {
        ILLARoute.navigate("/500", {
          replace: true,
        })
        break
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

export class BuilderApi {
  static request<RespData, RequestBody = any, ErrorResp = ApiError>(
    config: AxiosRequestConfig<RequestBody>,
    success?: (response: AxiosResponse<RespData, RequestBody>) => void,
    failure?: (response: AxiosResponse<ErrorResp, RequestBody>) => void,
    crash?: (e: AxiosError) => void,
    loading?: (loading: boolean) => void,
    errorState?: (errorState: boolean) => void,
  ) {
    Api.request(config, success, failure, crash, loading, errorState)
  }

  static teamRequest<RespData, RequestBody = any, ErrorResp = ApiError>(
    config: AxiosRequestConfig<RequestBody>,
    success?: (response: AxiosResponse<RespData, RequestBody>) => void,
    failure?: (response: AxiosResponse<ErrorResp, RequestBody>) => void,
    crash?: (e: AxiosError) => void,
    loading?: (loading: boolean) => void,
    errorState?: (errorState: boolean) => void,
  ) {
    const teamId = getTeamID()
    config = {
      ...config,
      url: `/teams/${teamId}` + config.url,
    }
    Api.request(config, success, failure, crash, loading, errorState)
  }
}

export class CloudApi {
  static request<RespData, RequestBody = any, ErrorResp = ApiError>(
    config: AxiosRequestConfig<RequestBody>,
    success?: (response: AxiosResponse<RespData, RequestBody>) => void,
    failure?: (response: AxiosResponse<ErrorResp, RequestBody>) => void,
    crash?: (e: AxiosError) => void,
    loading?: (loading: boolean) => void,
    errorState?: (errorState: boolean) => void,
  ) {
    config = {
      ...config,
      baseURL: `${location.protocol}//${
        import.meta.env.VITE_API_BASE_URL
      }${CLOUD}`,
    }
    Api.request(config, success, failure, crash, loading, errorState)
  }

  static teamRequest<RespData, RequestBody = any, ErrorResp = ApiError>(
    config: AxiosRequestConfig<RequestBody>,
    success?: (response: AxiosResponse<RespData, RequestBody>) => void,
    failure?: (response: AxiosResponse<ErrorResp, RequestBody>) => void,
    crash?: (e: AxiosError) => void,
    loading?: (loading: boolean) => void,
    errorState?: (errorState: boolean) => void,
  ) {
    const teamId = getTeamID()
    config = {
      ...config,
      baseURL: `${location.protocol}//${
        import.meta.env.VITE_API_BASE_URL
      }${CLOUD}`,
      url: `/teams/${teamId}` + config.url,
    }
    Api.request(config, success, failure, crash, loading, errorState)
  }
}
