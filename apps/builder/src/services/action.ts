import {
  actionBasicRequest,
  actionRequest,
  builderRequest,
  notNeedAuthAxios,
} from "@illa-public/illa-net"
import { BUILDER_REQUEST_PREFIX } from "@illa-public/illa-net/constant"
import { ActionContent, ActionType } from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
import { AxiosRequestConfig, Method } from "axios"
import { getParamsFromIllaRoute } from "@/utils/routerHelper"
import { getCurrentTeamID, getCurrentTeamIdentifier } from "../utils/team"

interface IActionRunResultRequestData {
  resourceID: string
  actionType: ActionType
  displayName: string
  content: ActionContent
}

export interface IActionRunResultResponseData<R = Record<string, any>[]> {
  Rows: R
  Extra: Record<string, any> | null
  Success: boolean
}

export const fetchActionRunResult = (
  appID: string,
  actionID: string,
  data: IActionRunResultRequestData,
  isPublic: boolean,
  abortSignal?: AbortSignal,
) => {
  let url: string
  let options: { teamIdentifier?: string; teamID?: string } = {}
  if (isPublic) {
    url = `/apps/${appID}/publicActions/${actionID}/run`
    options.teamIdentifier = getCurrentTeamIdentifier()
  } else {
    url = `/apps/${appID}/actions/${actionID}/run`
    options.teamID = getCurrentTeamID()
  }
  return actionRequest<IActionRunResultResponseData>(
    { url, method: "POST", data, signal: abortSignal },
    options,
  )
}

export const fetchS3ActionRunResult = (
  url: string,
  method: Method,
  headers: AxiosRequestConfig["headers"],
  data?: unknown,
) => {
  return notNeedAuthAxios({
    baseURL: url,
    method,
    headers,
    data,
  })
}

export const fetchCreateAction = (
  data: Omit<ActionItem<ActionContent>, "actionID">,
) => {
  const appId = getParamsFromIllaRoute("appId") as string
  const url = `/apps/${appId}/actions`
  return builderRequest<
    ActionItem<ActionContent>,
    Omit<ActionItem<ActionContent>, "actionID">
  >(
    {
      url,
      method: "POST",
      data,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

interface IDeleteActionResponse {
  actionID: string
}

export const fetchDeleteAction = (actionID: string) => {
  const appId = getParamsFromIllaRoute("appId") as string
  const url = `/apps/${appId}/actions/${actionID}`
  return builderRequest<IDeleteActionResponse>(
    {
      url,
      method: "DELETE",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchDownloadFileFromURL = (url: string) => {
  return actionBasicRequest({
    url,
    method: "GET",
  })
}

export const fetchUpdateAction = (action: ActionItem<ActionContent>) => {
  const appId = getParamsFromIllaRoute("appId") as string
  return builderRequest<ActionItem<ActionContent>>(
    {
      method: "PUT",
      url: `/apps/${appId}/actions/${action.actionID}`,
      data: action,
    },
    { teamID: getCurrentTeamID() },
  )
}

export const fetchBatchUpdateAction = (
  actions: ActionItem<ActionContent>[],
) => {
  const appId = getParamsFromIllaRoute("appId") as string
  return builderRequest<{
    actions: ActionItem<ActionContent>[]
  }>(
    {
      method: "PUT",
      url: `/apps/${appId}/actions/byBatch`,
      data: {
        actions: actions,
      },
    },
    { teamID: getCurrentTeamID() },
  )
}

interface IGenerateSQLRequest {
  description: string | undefined
  resourceID: string | undefined
  action: number
}

interface IGenerateSQLResponse {
  payload: string
}

export const fetchGenerateSQL = async (
  appID: string,
  data: IGenerateSQLRequest,
) => {
  return actionRequest<IGenerateSQLResponse>(
    {
      url: `/apps/${appID}/internalActions/generateSQL`,
      method: "POST",
      data,
    },
    {
      teamID: getCurrentTeamID(),
    },
    BUILDER_REQUEST_PREFIX,
  )
}
