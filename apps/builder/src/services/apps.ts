import { createAction } from "@/api/actions"
import { builderRequest, cloudRequest } from "@/api/http"
import {
  fetchInviteLinkResponse,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { DeployResp } from "@/page/App/components/PageNavBar/resp"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { DeleteDashboardAppResponse } from "@/page/Dashboard/components/DashboardItemMenu/interface"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getAppComponents } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import store from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"

interface IAPPPublicStatus {
  isPublic: boolean
}
export const fetchAPPPublicStatus = async (
  appID: string,
  signal: AbortSignal,
) => {
  return builderRequest<IAPPPublicStatus>(
    {
      url: `/publicApps/${appID}/isPublic`,
      method: "GET",
      signal: signal,
    },
    {
      needTeamIdentifier: true,
    },
  )
}

export const fetchPubicAppInitData = (
  appID: string,
  versionID: string,
  signal: AbortSignal,
) => {
  return builderRequest<CurrentAppResp>(
    {
      url: `/publicApps/${appID}/versions/${versionID}`,
      method: "GET",
      signal: signal,
    },
    {
      needTeamIdentifier: true,
    },
  )
}

export const fetchPrivateAppInitData = async (
  appID: string,
  versionID: string,
  signal: AbortSignal,
) => {
  return await builderRequest<CurrentAppResp>(
    {
      url: `/apps/${appID}/versions/${versionID}`,
      method: "GET",
      signal: signal,
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchDeployApp = (appID: string) => {
  return builderRequest<DeployResp>(
    {
      url: `/apps/${appID}/deploy`,
      method: "POST",
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchChangeAppName = (appID: string, appName: string) => {
  return builderRequest(
    {
      url: `/apps/${appID}`,
      method: "PUT",
      data: {
        appName,
      },
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchAppList = (signal: AbortSignal) => {
  return builderRequest<DashboardApp[]>(
    {
      url: "/apps",
      method: "GET",
      signal: signal,
    },
    {
      needTeamID: true,
    },
  )
}

interface IAppCreateRequestData {
  appName: string
  initScheme: ComponentNode[]
}
export const fetchCreateApp = (data: IAppCreateRequestData) => {
  return builderRequest<DashboardApp>(
    {
      url: "/apps",
      method: "POST",
      data,
    },
    { needTeamID: true },
  )
}

export const fetchDeleteApp = (appID: string) => {
  return builderRequest<DeleteDashboardAppResponse>(
    {
      url: `/apps/${appID}`,
      method: "DELETE",
    },
    { needTeamID: true },
  )
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
      needTeamID: true,
    },
  )
}

export const shareAppByEmail = async (
  email: string,
  userRole: USER_ROLE,
  appID: string,
) => {
  const response = await cloudRequest<inviteByEmailResponse>(
    {
      method: "POST",
      url: `/shareAppByEmail`,
      data: {
        email,
        userRole,
        appID,
        hosts: !isCloudVersion ? window.location.origin : undefined,
      },
    },
    { needTeamID: true },
  )
  return response.data
}

export const fetchShareAppLink = async (userRole: USER_ROLE, appID: string) => {
  const response = await cloudRequest<fetchInviteLinkResponse>(
    {
      method: "GET",
      url: `/shareAppLink/userRole/${userRole}/apps/${appID}`,
    },
    { needTeamID: true },
  )
  return response.data
}

export const renewShareAppLink = async (userRole: USER_ROLE, appID: string) => {
  const response = await cloudRequest<fetchInviteLinkResponse>(
    {
      method: "GET",
      url: `/newShareAppLink/userRole/${userRole}/apps/${appID}`,
    },
    {
      needTeamID: true,
    },
  )
  return response.data
}

export const updateAppPublicConfig = async (
  isPublic: boolean,
  appID: string,
) => {
  await builderRequest<fetchInviteLinkResponse>(
    {
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: {
        public: isPublic,
      },
    },
    {
      needTeamID: true,
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
      needTeamID: true,
    },
  )
}

export const createApp = async (
  appName: string,
  initScheme: ComponentNode[],
) => {
  const requestData = { appName, initScheme }
  const response = await fetchCreateApp(requestData)
  store.dispatch(
    dashboardAppActions.addDashboardAppReducer({
      app: response.data,
    }),
  )
  return response.data.appId
}

export const forkCurrentApp = async (appName: string) => {
  const actions = getActionList(store.getState())
  const components = getAppComponents(store.getState()) ?? []
  // fork app
  const appId = await createApp(appName, components)
  // fork actions
  await Promise.all(
    actions.map((data) => {
      return createAction(appId, data)
    }),
  )
  return appId
}
