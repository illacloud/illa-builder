import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { ApiError } from "@/api/base"
import {
  addRequestPendingPool,
  removeRequestPendingPool,
} from "@/api/helpers/axiosPendingPool"
import { getCurrentId } from "@/redux/team/teamSelector"
import { ILLARoute } from "@/router"
import { ILLA_CLOUD_PATH } from "@/router/routerConfig"
import store from "@/store"
import { getAuthToken, removeAuthToken } from "@/utils/auth"
import { isCloudVersion } from "@/utils/typeHelper"

const CLOUD = "/supervisior/api/v1"

const cloudAxios = Axios.create({
  baseURL: `${location.protocol}//${import.meta.env.VITE_API_BASE_URL}${CLOUD}`,
  timeout: 10000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

const authInterceptor = (config: AxiosRequestConfig) => {
  addRequestPendingPool(config)
  const token = getAuthToken()
  if (typeof token === "string") {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: token,
    }
  }
  return config
}

const fullFillInterceptor = (response: AxiosResponse) => {
  const { config } = response
  removeRequestPendingPool(config)
  return response
}

const axiosErrorInterceptor = (error: AxiosError) => {
  const { response } = error
  if (!response) return Promise.reject(error)
  const { status } = response
  switch (status) {
    // TODO: @aruseito maybe need custom error status, because of we'll have plugin to request other's api
    case 401: {
      removeAuthToken()
      if (isCloudVersion) {
        // navigate to illa cloud
        ILLARoute.navigate(ILLA_CLOUD_PATH)
      } else {
        const { pathname } = location
        ILLARoute.navigate("/login", {
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
}

cloudAxios.interceptors.request.use(authInterceptor, (err) => {
  return Promise.reject(err)
})

cloudAxios.interceptors.response.use(fullFillInterceptor, axiosErrorInterceptor)

export class CloudTeamApi {
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
    const teamId = getCurrentId(store.getState())
    cloudAxios
      .request<RespData, AxiosResponse<RespData>, RequestBody>({
        ...config,
        url: `/teams/${teamId}` + config.url,
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

export class CloudBaseApi {
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
    cloudAxios
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
