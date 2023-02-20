import { BuilderApi } from "@/api/base"
import { CloudApi } from "@/api/cloudApi"
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

export const shareAppByEmail = async (
  email: string,
  userRole: USER_ROLE,
  appID: string,
) => {
  try {
    const response = await CloudApi.asyncTeamRequest<inviteByEmailResponse>({
      method: "POST",
      url: `/shareAppByEmail`,
      data: {
        email,
        userRole,
        appID,
      },
    })
    return response.data
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}

export const fetchShareAppLink = async (userRole: USER_ROLE, appID: string) => {
  try {
    const response = await CloudApi.asyncTeamRequest<fetchInviteLinkResponse>({
      method: "GET",
      url: `/shareAppLink/userRole/${userRole}/apps/${appID}`,
    })
    return response.data
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}

export const renewShareAppLink = async (userRole: USER_ROLE, appID: string) => {
  try {
    const response = await CloudApi.asyncTeamRequest<fetchInviteLinkResponse>({
      method: "GET",
      url: `/newShareAppLink/userRole/${userRole}/apps/${appID}`,
    })
    return response.data
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}

export const updateAppPublicConfig = async (
  isPublic: boolean,
  appID: string,
) => {
  try {
    await BuilderApi.asyncTeamRequest<fetchInviteLinkResponse>({
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: {
        public: isPublic,
      },
    })
    return isPublic
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}
