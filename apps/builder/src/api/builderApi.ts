import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { ApiError } from "@/api/base"
import {
  authInterceptor,
  axiosErrorInterceptor,
  fullFillInterceptor,
} from "@/api/interceptors"
import { getCurrentId } from "@/redux/team/teamSelector"
import store from "@/store"

const BUILDER = "/builder/api/v1"

const builderAxios = Axios.create({
  baseURL: `${location.protocol}//${
    import.meta.env.VITE_API_BASE_URL
  }${BUILDER}`,
  timeout: 10000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

builderAxios.interceptors.request.use(authInterceptor, (err) => {
  return Promise.reject(err)
})

builderAxios.interceptors.response.use(
  fullFillInterceptor,
  axiosErrorInterceptor,
)

export class BuilderApi {
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
    builderAxios
      .request<RespData, AxiosResponse<RespData>, RequestBody>({
        ...config,
        baseURL: `${config.baseURL}/teams/${teamId}`,
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
