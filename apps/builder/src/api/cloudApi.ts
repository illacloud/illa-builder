import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { Api, ApiError } from "@/api/base"
import { getTeamID } from "@/utils/team"

const CLOUD = "/supervisor/api/v1"

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
