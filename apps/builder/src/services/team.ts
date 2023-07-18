import { authCloudRequest } from "@/api/http"
import {
  fetchInviteLinkResponse,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { teamActions } from "@/redux/team/teamSlice"
import { MemberInfo, TeamInfo } from "@/redux/team/teamState"
import { isCloudVersion } from "@/utils/typeHelper"
import store from "../store"

export const fetchMyTeamsInfo = () => {
  return authCloudRequest<TeamInfo[]>({
    url: "/teams/my",
    method: "GET",
  })
}

export const fetchUpdateMembers = () => {
  return authCloudRequest<MemberInfo[]>(
    {
      method: "GET",
      url: "/members",
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchRemoveTeam = () => {
  return authCloudRequest(
    {
      method: "DELETE",
    },
    {
      needTeamID: true,
    },
  )
}

interface IInviteLinkStatusRequest {
  inviteLinkEnabled: boolean
}
export const fetchUpdateInviteLinkStatus = (data: IInviteLinkStatusRequest) => {
  return authCloudRequest(
    {
      method: "PATCH",
      url: `/configInviteLink`,
      data,
    },
    {
      needTeamID: true,
    },
  )
}

interface IUpdateTeamPermissionConfigRequest {
  allowEditorManageTeamMember: boolean
  allowViewerManageTeamMember: boolean
}
export const fetchUpdateTeamPermissionConfig = (
  data: IUpdateTeamPermissionConfigRequest,
) => {
  return authCloudRequest(
    {
      method: "PATCH",
      url: `/permission`,
      data,
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchInviteLink = async (userRole: USER_ROLE) => {
  const response = await authCloudRequest<fetchInviteLinkResponse>(
    {
      method: "GET",
      url: `/inviteLink/userRole/${userRole}`,
    },
    {
      needTeamID: true,
    },
  )
  return response.data
}

export const fetchRenewInviteLink = async (userRole: USER_ROLE) => {
  const response = await authCloudRequest<fetchInviteLinkResponse>(
    {
      method: "GET",
      url: `/newInviteLink/userRole/${userRole}`,
    },
    {
      needTeamID: true,
    },
  )
  return response.data
}

interface IInviteByEmailRequest {
  email: string
  userRole: USER_ROLE
  hosts?: string
}
export const fetchInviteByEmail = (data: IInviteByEmailRequest) => {
  return authCloudRequest<inviteByEmailResponse>(
    {
      method: "POST",
      url: `/inviteByEmail`,
      data,
    },
    {
      needTeamID: true,
    },
  )
}

interface IUpdateChangeUserRoleRequest {
  userRole: USER_ROLE
}

export const fetchChangeUserRole = (
  teamMemberID: string,
  data: IUpdateChangeUserRoleRequest,
) => {
  return authCloudRequest<inviteByEmailResponse>(
    {
      method: "PATCH",
      url: `/teamMembers/${teamMemberID}/role`,
      data,
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchRemoveTeamMember = (teamMemberID: string) => {
  return authCloudRequest(
    {
      method: "DELETE",
      url: `/teamMembers/${teamMemberID}`,
    },
    {
      needTeamID: true,
    },
  )
}

export const updateMembers = async () => {
  const response = await fetchUpdateMembers()
  if (!response.data) return
  store.dispatch(teamActions.updateMemberListReducer(response.data))
  return response.data
}

export const updateTeamsInfo = async (teamIdentifier?: string) => {
  const response = await fetchMyTeamsInfo()
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
  await fetchRemoveTeam()
  window.open("/", "_self")
  return true
}

export const setInviteLinkEnabled = async (inviteLinkEnabled: boolean) => {
  await fetchUpdateInviteLinkStatus({ inviteLinkEnabled })
  const teamInfo = getCurrentTeamInfo(store.getState())
  const teamIdentifier = teamInfo?.identifier
  updateTeamsInfo(teamIdentifier)
  return inviteLinkEnabled
}

export const updateTeamPermissionConfig = async (
  allowEditorManageTeamMember: boolean,
  allowViewerManageTeamMember: boolean,
) => {
  const teamInfo = getCurrentTeamInfo(store.getState())
  const teamIdentifier = teamInfo?.identifier

  const requestData = {
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
  }
  await fetchUpdateTeamPermissionConfig(requestData)
  updateTeamsInfo(teamIdentifier)
  return allowEditorManageTeamMember && allowViewerManageTeamMember
}

export const inviteByEmail = async (email: string, userRole: USER_ROLE) => {
  const requestData = {
    email,
    userRole,
    hosts: !isCloudVersion ? window.location.origin : undefined,
  }
  const response = await fetchInviteByEmail(requestData)
  updateMembers()
  return response.data
}

export const changeTeamMembersRole = async (
  teamMemberID: string,
  userRole: USER_ROLE,
) => {
  const requestData = {
    userRole,
  }
  await fetchChangeUserRole(teamMemberID, requestData)
  return true
}

export const removeTeamMembers = async (teamMemberID: string) => {
  await fetchRemoveTeamMember(teamMemberID)
  updateMembers()
  return true
}
