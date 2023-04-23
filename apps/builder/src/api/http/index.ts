import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getCurrentPageTeamIdentifier, getTeamID } from "@/utils/team"
import { actionRuntimeAxios, basicAxios } from "./base"
import {
  ACTION_REQUEST_PREFIX,
  BUILDER_REQUEST_PREFIX,
  CLOUD_REQUEST_PREFIX,
} from "./constant"

export interface ILLAApiError {
  errorCode: string | number
  errorMessage: string
}

export const basicRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  try {
    return await basicAxios.request({
      ...requestConfig,
    })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response
    }

    throw e
  }
}

export const actionBasicRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  try {
    return await actionRuntimeAxios.request({
      ...requestConfig,
    })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response
    }
    throw e
  }
}

interface RequestHandlerOptions {
  needTeamID?: boolean
  needTeamIdentifier?: boolean
}

const getURLWithPrefix = (
  url: AxiosRequestConfig["url"],
  prefix: string,
  options?: RequestHandlerOptions,
) => {
  let finalURL = prefix + url
  if (options?.needTeamIdentifier) {
    const teamIdentifier = getCurrentPageTeamIdentifier()
    finalURL = `${prefix}/teams/byIdentifier/${teamIdentifier}` + url
  } else if (options?.needTeamID) {
    const teamId = getTeamID()
    finalURL = `${prefix}/teams/${teamId}` + url
  }
  return finalURL
}

export const builderRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(
    requestConfig.url,
    BUILDER_REQUEST_PREFIX,
    options,
  )

  return await basicRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  })
}

export const cloudRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(
    requestConfig.url,
    CLOUD_REQUEST_PREFIX,
    options,
  )

  return await basicRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  })
}

export const actionRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
  customPrefix?: string,
) => {
  const finalURL = getURLWithPrefix(
    requestConfig.url,
    customPrefix ? customPrefix : ACTION_REQUEST_PREFIX,
    options,
  )
  return await actionBasicRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  })
}
