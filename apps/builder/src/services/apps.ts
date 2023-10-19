import { builderRequest } from "@illa-public/illa-net"
import { createAction } from "@/api/actions"
import { DeployResp } from "@/page/App/components/PageNavBar/resp"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { DashboardApp } from "@/redux/currentApp/appInfo/appInfoState"
import { getCanvas } from "@/redux/currentApp/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/components/componentsState"
import store from "@/store"
import { getCurrentTeamID } from "../utils/team"

interface IAPPPublicStatus {
  isPublic: boolean
}

export const fetchAPPPublicStatus = async (
  appID: string,
  teamIdentifier?: string,
  signal?: AbortSignal,
) => {
  return builderRequest<IAPPPublicStatus>(
    {
      url: `/publicApps/${appID}/isPublic`,
      method: "GET",
      signal: signal,
    },
    {
      teamIdentifier: teamIdentifier,
    },
  )
}

export const fetchPubicAppInitData = (
  appID: string,
  versionID: string,
  teamIdentifier?: string,
  signal?: AbortSignal,
) => {
  return builderRequest<CurrentAppResp>(
    {
      url: `/publicApps/${appID}/versions/${versionID}`,
      method: "GET",
      signal: signal,
    },
    {
      teamIdentifier: teamIdentifier,
    },
  )
}

export const fetchPrivateAppInitData = async (
  appID: string,
  versionID: string,
  signal?: AbortSignal,
) => {
  return await builderRequest<CurrentAppResp>(
    {
      url: `/apps/${appID}/versions/${versionID}`,
      method: "GET",
      signal: signal,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchDeployApp = (appID: string, isPublic?: boolean) => {
  return builderRequest<DeployResp>(
    {
      url: `/apps/${appID}/deploy`,
      method: "POST",
      data: {
        public: isPublic,
      },
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchChangeAppSetting = (
  appID: string,
  appName: string,
  description?: string,
) => {
  return builderRequest(
    {
      url: `/apps/${appID}`,
      method: "PUT",
      data: {
        appName,
        config: {
          description,
        },
      },
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

interface IAppCreateRequestData {
  appName: string
  initScheme: ComponentNode
}

export const fetchCreateApp = (data: IAppCreateRequestData) => {
  return builderRequest<DashboardApp>(
    {
      url: "/apps",
      method: "POST",
      data,
    },
    { teamID: getCurrentTeamID() },
  )
}

export const fetchDeleteApp = (appID: string) => {
  return builderRequest<{ appID: string }>(
    {
      url: `/apps/${appID}`,
      method: "DELETE",
    },
    { teamID: getCurrentTeamID() },
  )
}

export const updateAppPublicConfig = async (
  isPublic: boolean,
  appID: string,
) => {
  await builderRequest<{}>(
    {
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: {
        public: isPublic,
      },
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
  return true
}

export const updateWaterMarkConfig = async (
  waterMark: boolean,
  appID: string,
) => {
  return builderRequest<DashboardApp>(
    {
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: {
        waterMark,
      },
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const updateAppConfig = async (
  appID: string,
  config: {
    public?: boolean
    waterMark?: boolean
    description?: string
    appName?: string
  },
) => {
  return builderRequest<DashboardApp>(
    {
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: config,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const createApp = async (appName: string, initScheme: ComponentNode) => {
  const requestData = { appName, initScheme }
  const response = await fetchCreateApp(requestData)
  return response.data.appId
}

export const forkCurrentApp = async (appName: string) => {
  const actions = getActionList(store.getState())
  const rootComponentNode = getCanvas(store.getState()) as ComponentNode
  // fork app
  const appId = await createApp(appName, rootComponentNode)
  // fork actions
  await Promise.all(
    actions.map((data) => {
      return createAction(appId, data)
    }),
  )
  return appId
}

export const fetchCopyApp = (appID: string, name: string) => {
  return builderRequest<DashboardApp>(
    {
      url: `/apps/${appID}/duplication`,
      method: "POST",
      data: {
        appName: name,
      },
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}
