import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { Api, ApiError } from "@/api/base"
import { getTeamID } from "@/utils/team"
import { isCloudVersion } from "@/utils/typeHelper"

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
    config.baseURL = isCloudVersion
      ? `${location.protocol}//${import.meta.env.VITE_API_BASE_URL}${CLOUD}`
      : `${location.origin}${CLOUD}`
    Api.request(config, success, failure, crash, loading, errorState)
  }

  static asyncRequest<RespData, RequestBody = any, ErrorResp = ApiError>(
    config: AxiosRequestConfig<RequestBody>,
  ) {
    config.baseURL = isCloudVersion
      ? `${location.protocol}//${import.meta.env.VITE_API_BASE_URL}${CLOUD}`
      : `${location.origin}${CLOUD}`
    return Api.asyncRequest<RespData, RequestBody, ErrorResp>(config)
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
    config.url = `/teams/${teamId}` + config.url
    this.request<RespData, RequestBody, ErrorResp>(
      config,
      success,
      failure,
      crash,
      loading,
      errorState,
    )
  }

  static asyncTeamRequest<RespData, RequestBody = any, ErrorResp = ApiError>(
    config: AxiosRequestConfig<RequestBody>,
  ) {
    const teamId = getTeamID()
    config.url = `/teams/${teamId}` + config.url
    return this.asyncRequest<RespData, RequestBody, ErrorResp>(config)
  }
}
