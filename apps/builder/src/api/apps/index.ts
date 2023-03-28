import { createAction } from "@/api/actions"
import { BuilderApi } from "@/api/base"
import { CloudApi } from "@/api/cloudApi"
import {
  fetchInviteLinkResponse,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getAppComponents } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import store from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"

export interface fetchShareAppLinkResponse {
  appID: number
  teamID: number
  userRole: USER_ROLE
  shareAppLink: string
}

export const shareAppByEmail = async (
  email: string,
  userRole: USER_ROLE,
  appID: string,
) => {
  const response = await CloudApi.asyncTeamRequest<inviteByEmailResponse>({
    method: "POST",
    url: `/shareAppByEmail`,
    data: {
      email,
      userRole,
      appID,
      hosts: !isCloudVersion ? window.location.origin : undefined,
    },
  })
  return response.data
}

export const fetchShareAppLink = async (userRole: USER_ROLE, appID: string) => {
  const response = await CloudApi.asyncTeamRequest<fetchInviteLinkResponse>({
    method: "GET",
    url: `/shareAppLink/userRole/${userRole}/apps/${appID}`,
  })
  return response.data
}

export const renewShareAppLink = async (userRole: USER_ROLE, appID: string) => {
  const response = await CloudApi.asyncTeamRequest<fetchInviteLinkResponse>({
    method: "GET",
    url: `/newShareAppLink/userRole/${userRole}/apps/${appID}`,
  })
  return response.data
}

export const updateAppPublicConfig = async (
  isPublic: boolean,
  appID: string,
) => {
  await BuilderApi.asyncTeamRequest<fetchInviteLinkResponse>({
    method: "PATCH",
    url: `/apps/${appID}/config`,
    data: {
      public: isPublic,
    },
  })
  return true
}

export const createApp = async (
  appName: string,
  initScheme: ComponentNode[],
) => {
  const response = await BuilderApi.asyncTeamRequest<DashboardApp>({
    url: "/apps",
    method: "POST",
    data: {
      appName,
      initScheme,
    },
  })

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
