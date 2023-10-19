import { authCloudRequest } from "@illa-public/illa-net"
import { MemberInfo, TeamInfo } from "@illa-public/user-data"

export const fetchJoinTeam = (inviteToken: string) => {
  return authCloudRequest<TeamInfo>({
    method: "PUT",
    url: `/join/${inviteToken}`,
  })
}

export const fetchMemberList = (teamID: string) => {
  return authCloudRequest<MemberInfo[]>(
    {
      url: "/members",
      method: "GET",
    },
    {
      teamID,
    },
  )
}

export const fetchCurrentUserTeamsInfo = () => {
  return authCloudRequest<TeamInfo[]>({
    url: "/teams/my",
    method: "GET",
  })
}
