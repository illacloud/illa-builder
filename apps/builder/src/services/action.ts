import {
  actionBasicRequest,
  actionRequest,
  builderRequest,
} from "@illa-public/illa-net"
import { BUILDER_REQUEST_PREFIX } from "@illa-public/illa-net/constant"
import { AxiosRequestConfig, Method } from "axios"
import {
  ActionContent,
  ActionItem,
  ActionType,
} from "@/redux/currentApp/action/actionState"
import { ResourceContent, ResourceType } from "@/redux/resource/resourceState"
import { getParamsFromIllaRoute } from "@/utils/routerHelper"
import { getCurrentTeamID, getCurrentTeamIdentifier } from "../utils/team"

interface IActionTestConnectionRequestData {
  resourceID: string
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
      teamID: getCurrentTeamID(),
    },
  )
}

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
  return actionBasicRequest<BlobPart>({
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
