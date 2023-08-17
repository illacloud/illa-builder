import { authCloudRequest } from "@illa-public/illa-net"
import {
  MemberInfo,
  TeamInfo,
  getCurrentTeamInfo,
  teamActions,
} from "@illa-public/user-data"
import store from "../store"
import { getCurrentTeamID } from "../utils/team"


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
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchRemoveTeam = () => {
  return authCloudRequest(
    {
      method: "DELETE",
    },
    {
      teamID: getCurrentTeamID(),
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
      teamID: getCurrentTeamID(),
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
      teamID: getCurrentTeamID(),
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
      teamID: getCurrentTeamID(),
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
  await updateTeamsInfo(teamIdentifier)
  return inviteLinkEnabled
}

export const updateTeamPermissionConfig = async (
  allowEditorManageTeamMember: boolean,
  allowViewerManageTeamMember: boolean,
  blockRegister: boolean,
) => {
  const teamInfo = getCurrentTeamInfo(store.getState())
  const teamIdentifier = teamInfo?.identifier

  const requestData = {
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
    blockRegister,
  }
  await fetchUpdateTeamPermissionConfig(requestData)
  await updateTeamsInfo(teamIdentifier)
  return allowEditorManageTeamMember && allowViewerManageTeamMember
}

export const removeTeamMembers = async (teamMemberID: string) => {
  await fetchRemoveTeamMember(teamMemberID)
  await updateMembers()
  return true
}