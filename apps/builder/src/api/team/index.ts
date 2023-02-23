import { CloudApi } from "@/api/cloudApi"
import {
  fetchInviteLinkResponse,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { teamActions } from "@/redux/team/teamSlice"
import { MemberInfo, TeamInfo } from "@/redux/team/teamState"
import store from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"

export const updateMembers = async () => {
  const response = await CloudApi.asyncTeamRequest<MemberInfo[]>({
    method: "GET",
    url: "/members",
  })
  if (!response.data) return
  store.dispatch(teamActions.updateMemberListReducer(response.data))
  return response.data
}

export const getTeamsInfo = async (teamIdentifier?: string, token?: string) => {
  const response = await CloudApi.asyncRequest<TeamInfo[]>({
    url: "/teams/my",
    method: "GET",
    headers: token
      ? {
          Authorization: token,
        }
      : undefined,
  })
  const data = response.data ?? []
  const currentTeamInfo = data.find(
    (item) => item.identifier === teamIdentifier,
  )
  if (currentTeamInfo) {
    store.dispatch(teamActions.updateCurrentIdReducer(currentTeamInfo.id))
    store.dispatch(teamActions.updateTeamItemsReducer(data))
    return currentTeamInfo
  }
  return Promise.reject("have no team match")
}

export const updateTeamsInfo = async (teamIdentifier?: string) => {
  const response = await CloudApi.asyncRequest<TeamInfo[]>({
    url: "/teams/my",
    method: "GET",
  })
  const data = response.data
  const currentTeamInfo = data.find(
    (item) => item.identifier === teamIdentifier,
  )
  if (currentTeamInfo) {
    store.dispatch(teamActions.updateCurrentIdReducer(currentTeamInfo.id))
    store.dispatch(teamActions.updateTeamItemsReducer(data))
  } else {
    store.dispatch(
      teamActions.updateTeamReducer({
        currentId: data?.[0]?.id,
        items: data,
      }),
    )
  }
  return data
}

export const removeTeam = async () => {
  await CloudApi.asyncTeamRequest({
    method: "DELETE",
  })
  window.open("/", "_self")
  return true
}

export const setInviteLinkEnabled = async (inviteLinkEnabled: boolean) => {
  const teamInfo = getCurrentTeamInfo(store.getState())
  const teamIdentifier = teamInfo?.identifier

  await CloudApi.asyncTeamRequest({
    method: "PATCH",
    url: `/configInviteLink`,
    data: {
      inviteLinkEnabled,
    },
  })
  updateTeamsInfo(teamIdentifier)
  return inviteLinkEnabled
}

export const updateTeamPermissionConfig = async (
  allowEditorManageTeamMember: boolean,
  allowViewerManageTeamMember: boolean,
) => {
  const teamInfo = getCurrentTeamInfo(store.getState())
  const teamIdentifier = teamInfo?.identifier

  await CloudApi.asyncTeamRequest({
    method: "PATCH",
    url: `/permission`,
    data: {
      allowEditorManageTeamMember,
      allowViewerManageTeamMember,
    },
  })
  updateTeamsInfo(teamIdentifier)
  return allowEditorManageTeamMember && allowViewerManageTeamMember
}

export const fetchInviteLink = async (userRole: USER_ROLE) => {
  const response = await CloudApi.asyncTeamRequest<fetchInviteLinkResponse>({
    method: "GET",
    url: `/inviteLink/userRole/${userRole}`,
  })
  return response.data
}

export const renewInviteLink = async (userRole: USER_ROLE) => {
  const response = await CloudApi.asyncTeamRequest<fetchInviteLinkResponse>({
    method: "GET",
    url: `/newInviteLink/userRole/${userRole}`,
  })
  return response.data
}

// need to update member list
export const inviteByEmail = async (email: string, userRole: USER_ROLE) => {
  const response = await CloudApi.asyncTeamRequest<inviteByEmailResponse>({
    method: "POST",
    url: `/inviteByEmail`,
    data: {
      email,
      userRole,
      hosts: !isCloudVersion ? window.location.origin : undefined,
    },
  })
  updateMembers()
  return response.data
}

export const changeTeamMembersRole = async (
  teamMemberID: string,
  userRole: USER_ROLE,
) => {
  await CloudApi.asyncTeamRequest<inviteByEmailResponse>({
    method: "PATCH",
    url: `/teamMembers/${teamMemberID}/role`,
    data: {
      userRole,
    },
  })
  updateMembers()
  return true
}

export const removeTeamMembers = async (teamMemberID: string) => {
  await CloudApi.asyncTeamRequest({
    method: "DELETE",
    url: `/teamMembers/${teamMemberID}`,
  })
  updateMembers()
  return true
}
