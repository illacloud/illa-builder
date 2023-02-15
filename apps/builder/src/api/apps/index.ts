import { Api } from "@/api/base"
import { CloudBaseApi, CloudTeamApi } from "@/api/cloudApi"
import {
  fetchInviteLinkResponse,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"

export interface fetchShareAppLinkResponse {
  appID: number
  teamID: number
  userRole: USER_ROLE
  shareAppLink: string
}

export const shareAppByEmail = (
  email: string,
  userRole: USER_ROLE,
  appID: string,
) => {
  return new Promise<inviteByEmailResponse>((resolve, reject) => {
    CloudTeamApi.request<inviteByEmailResponse>(
      {
        method: "POST",
        url: `/shareAppByEmail`,
        data: {
          email,
          userRole,
          appID,
        },
      },
      (res) => {
        resolve(res.data)
      },
      (res) => {
        reject(false)
      },
      () => {
        reject(false)
      },
    )
  })
}

export const fetchShareAppLink = (userRole: USER_ROLE, appID: string) => {
  return new Promise<fetchInviteLinkResponse>((resolve, reject) => {
    CloudTeamApi.request<fetchInviteLinkResponse>(
      {
        method: "GET",
        url: `/shareAppLink/userRole/${userRole}/apps/${appID}`,
      },
      (res) => {
        resolve(res.data)
      },
      (res) => {
        reject(false)
      },
      () => {
        reject(false)
      },
    )
  })
}

export const renewShareAppLink = (userRole: USER_ROLE, appID: string) => {
  return new Promise<fetchInviteLinkResponse>((resolve, reject) => {
    CloudTeamApi.request<fetchInviteLinkResponse>(
      {
        method: "GET",
        url: `/newShareAppLink/userRole/${userRole}/apps/${appID}`,
      },
      (res) => {
        resolve(res.data)
      },
      (res) => {
        reject(false)
      },
      () => {
        reject(false)
      },
    )
  })
}

export const updateAppPublicConfig = (isPublic: boolean, appID: string) => {
  return new Promise<boolean>((resolve, reject) => {
    Api.request<fetchInviteLinkResponse>(
      {
        method: "PATCH",
        url: `/apps/${appID}/config`,
        data: {
          public: isPublic,
        },
      },
      () => {
        resolve(true)
      },
      () => {
        reject(false)
      },
      () => {
        reject(false)
      },
    )
  })
}
