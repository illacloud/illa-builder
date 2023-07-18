import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getCurrentPageTeamIdentifier, getTeamID } from "@/utils/team"
import { ERROR_FLAG } from "../errorFlag"
import { actionRuntimeAxios, needAuthAxios, notNeedAuthAxios } from "./base"
import {
  ACTION_REQUEST_PREFIX,
  BUILDER_REQUEST_PREFIX,
  CLOUD_REQUEST_PREFIX,
  DRIVE_REQUEST_PREFIX,
  PUBLIC_DRIVE_REQUEST_PREFIX,
} from "./constant"

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

export interface ILLAApiError {
  errorCode: string | number
  errorFlag: ERROR_FLAG
  errorMessage: string
}

export const needAuthRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  try {
    return await needAuthAxios.request({
      ...requestConfig,
    })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response
    }

    throw e
  }
}

export const notNeedAuthRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  try {
    return await notNeedAuthAxios.request({
      ...requestConfig,
    })
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw e.response
    }

    throw e
  }
}

export const authCloudRequest = async <
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

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  })
}

export const notNeedAuthCloudRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  const finalURL = getURLWithPrefix(requestConfig.url, CLOUD_REQUEST_PREFIX)
  try {
    return await notNeedAuthRequest({
      ...requestConfig,
      url: finalURL,
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

  return await needAuthRequest<ResponseData, RequestData>({
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

export const driveRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(
    requestConfig.url,
    DRIVE_REQUEST_PREFIX,
    options,
  )

  return await needAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  })
}

export const publicDriveRequest = async <
  ResponseData = unknown,
  RequestData = unknown,
>(
  requestConfig: AxiosRequestConfig<RequestData>,
  options?: RequestHandlerOptions,
) => {
  const finalURL = getURLWithPrefix(
    requestConfig.url,
    PUBLIC_DRIVE_REQUEST_PREFIX,
    options,
  )

  return await notNeedAuthRequest<ResponseData, RequestData>({
    ...requestConfig,
    url: finalURL,
  })
}
