import axios from "axios"
import { CloudBaseApi, CloudTeamApi, cloudAxios } from "@/api/cloudApi"
import {
  fetchInviteLinkResponse,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { teamActions } from "@/redux/team/teamSlice"
import { MemberInfo, TeamInfo } from "@/redux/team/teamState"
import store from "@/store"

export const getMembersFormTeamId = async (teamId: string) => {
  try {
    const { data } = await axios.get<MemberInfo[]>(`/teams/${teamId}/members`)
    if (!data) return
    store.dispatch(teamActions.updateCurrentMemberListReducer(data))
    return data
  } catch (e) {
    return
  }
}

export const getMembers = async () => {
  return new Promise<MemberInfo[]>(async (resolve, reject) => {
    CloudTeamApi.request<MemberInfo[]>(
      {
        method: "GET",
        url: "/members",
      },
      ({ data }) => {
        if (!data) return
        store.dispatch(teamActions.updateCurrentMemberListReducer(data))
        resolve(data)
      },
      (e) => {
        console.error(e)
        reject(e)
      },
    )
  })
}

export const getTeamsInfo = (teamIdentifier?: string, token?: string) => {
  return new Promise<TeamInfo>((resolve, reject) => {
    CloudBaseApi.request<TeamInfo[]>(
      {
        url: "/teams/my",
        method: "GET",
        headers: token
          ? {
              Authorization: token,
            }
          : undefined,
      },
      (response) => {
        const data = response.data ?? []
        const currentTeamInfo = data.find(
          (item) => item.identifier === teamIdentifier,
        )
        if (currentTeamInfo) {
          store.dispatch(teamActions.updateCurrentIdReducer(currentTeamInfo.id))
          store.dispatch(teamActions.updateTeamItemsReducer(data))
          resolve(currentTeamInfo)
        }
        reject("have no team match")
      },
      (e) => {
        reject(e)
      },
      (e) => {
        reject(e)
      },
      () => {},
    )
  })
}
export const updateTeamsInfo = (teamIdentifier?: string) => {
  return new Promise<TeamInfo[]>((resolve, reject) => {
    CloudTeamApi.request<TeamInfo[]>(
      {
        url: "/teams/my",
        method: "GET",
      },
      (response) => {
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
        resolve(data)
      },
      () => {
        reject("error")
      },
      () => {
        reject("error")
      },
      () => {},
    )
  })
}

export const removeTeam = () => {
  return new Promise<boolean>((resolve, reject) => {
    CloudTeamApi.request(
      {
        method: "DELETE",
      },
      () => {
        resolve(true)
        window.open("/", "_self")
      },
      (e) => {
        reject(e)
      },
      (e) => {
        reject(e)
      },
    )
  })
}
export const setInviteLinkEnabled = (inviteLinkEnabled: boolean) => {
  const teamInfo = getCurrentTeamInfo(store.getState())
  const teamIdentifier = teamInfo?.identifier
  return new Promise<boolean>((resolve, reject) => {
    CloudTeamApi.request(
      {
        method: "PATCH",
        url: `/configInviteLink`,
        data: {
          inviteLinkEnabled,
        },
      },
      () => {
        resolve(inviteLinkEnabled)
        updateTeamsInfo(teamIdentifier)
      },
      (res) => {
        reject(res)
      },
      () => {
        reject("crash")
      },
    )
  })
}
export const updateTeamPermissionConfig = (
  allowEditorManageTeamMember: boolean,
  allowViewerManageTeamMember: boolean,
) => {
  return new Promise<boolean>((resolve, reject) => {
    const teamInfo = getCurrentTeamInfo(store.getState())
    const teamIdentifier = teamInfo?.identifier
    CloudTeamApi.request(
      {
        method: "PATCH",
        url: `/permission`,
        data: {
          allowEditorManageTeamMember,
          allowViewerManageTeamMember,
        },
      },
      () => {
        resolve(allowEditorManageTeamMember && allowViewerManageTeamMember)
        updateTeamsInfo(teamIdentifier)
      },
      (res) => {
        reject(res)
      },
      () => {
        reject("crash")
      },
    )
  })
}
export const fetchInviteLink = (userRole: USER_ROLE) => {
  return new Promise<fetchInviteLinkResponse>((resolve, reject) => {
    CloudTeamApi.request<fetchInviteLinkResponse>(
      {
        method: "GET",
        url: `/inviteLink/userRole/${userRole}`,
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
export const renewInviteLink = (userRole: USER_ROLE) => {
  return new Promise<fetchInviteLinkResponse>((resolve, reject) => {
    CloudTeamApi.request<fetchInviteLinkResponse>(
      {
        method: "GET",
        url: `/newInviteLink/userRole/${userRole}`,
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

// need to update member list
export const inviteByEmail = (email: string, userRole: USER_ROLE) => {
  return new Promise<inviteByEmailResponse>((resolve, reject) => {
    CloudTeamApi.request<inviteByEmailResponse>(
      {
        method: "POST",
        url: `/inviteByEmail`,
        data: {
          email,
          userRole,
        },
      },
      (res) => {
        resolve(res.data)
        // getMembers()
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
export const changeTeamMembersRole = (
  teamMemberID: string,
  userRole: USER_ROLE,
) => {
  return new Promise<boolean>((resolve, reject) => {
    CloudTeamApi.request<inviteByEmailResponse>(
      {
        method: "PATCH",
        url: `/teamMembers/${teamMemberID}/role`,
        data: {
          userRole,
        },
      },
      (res) => {
        // if (userRole === USER_ROLE.OWNER) {
        // }
        // getMembers()
        resolve(true)
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
export const removeTeamMembers = (teamMemberID: string) => {
  return new Promise<boolean>((resolve, reject) => {
    CloudTeamApi.request(
      {
        method: "DELETE",
        url: `/teamMembers/${teamMemberID}`,
      },
      () => {
        resolve(true)
        // getMembers()
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
