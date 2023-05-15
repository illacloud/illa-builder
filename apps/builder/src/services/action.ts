import { AxiosRequestConfig, Method } from "axios"
import { actionBasicRequest, actionRequest, builderRequest } from "@/api/http"
import {
  ActionContent,
  ActionItem,
  ActionType,
} from "@/redux/currentApp/action/actionState"
import { ResourceContent, ResourceType } from "@/redux/resource/resourceState"
import { getParamsFromIllaRoute } from "@/utils/routerHelper"
import { BUILDER_REQUEST_PREFIX } from "../api/http/constant"

interface IActionTestConnectionRequestData {
  resourceId: string
  resourceName: string
  resourceType: ResourceType
  content: ResourceContent
}

export const fetchActionTestConnection = (
  data: IActionTestConnectionRequestData,
) => {
  return actionRequest<null>(
    { url: "/resources/testConnection", method: "POST", data },
    {
      needTeamID: true,
    },
  )
}

interface IActionRunResultRequestData {
  resourceId: string
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
  actionId: string,
  data: IActionRunResultRequestData,
  isPublic: boolean,
) => {
  let url: string
  let options: { needTeamIdentifier?: boolean; needTeamID?: boolean } = {}
  if (isPublic) {
    url = `/apps/${appID}/publicActions/${actionId}/run`
    options.needTeamIdentifier = true
  } else {
    url = `/apps/${appID}/actions/${actionId}/run`
    options.needTeamID = true
  }
  return actionRequest<IActionRunResultResponseData>(
    { url, method: "POST", data },
    options,
  )
}

export const fetchS3ActionRunResult = (
  url: string,
  method: Method,
  headers: AxiosRequestConfig["headers"],
  data?: unknown,
) => {
  return actionBasicRequest<BlobPart>({
    baseURL: url,
    method,
    headers,
    data,
  })
}

export const fetchCreateAction = (
  data: Omit<ActionItem<ActionContent>, "actionId">,
) => {
  const appId = getParamsFromIllaRoute("appId") as string
  const url = `/apps/${appId}/actions`
  return builderRequest<
    ActionItem<ActionContent>,
    Omit<ActionItem<ActionContent>, "actionId">
  >(
    {
      url,
      method: "POST",
      data,
    },
    {
      needTeamID: true,
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
      needTeamID: true,
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
      url: `/apps/${appId}/actions/${action.actionId}`,
      data: action,
    },
    { needTeamID: true },
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
      needTeamID: true,
    },
    BUILDER_REQUEST_PREFIX,
  )
}
