import { FC, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { MemberList } from "@/illa-public-component/MemberList"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { MemberProps } from "@/page/Member/interface"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import {
  getCurrentMemberList,
  getCurrentTeamInfo,
} from "@/redux/team/teamSelector"
import { fetchBuilderDesc } from "@/services/public"
import {
  changeTeamMembersRole,
  fetchInviteLink,
  fetchRenewInviteLink,
  inviteByEmail,
  removeTeam,
  removeTeamMembers,
  setInviteLinkEnabled,
  updateMembers,
  updateTeamPermissionConfig,
  updateTeamsInfo,
} from "@/services/team"
import { leaveTeamErrorHandler } from "@/utils/billing/errorHandler"
import { isCloudVersion } from "@/utils/typeHelper"

export const Member: FC<MemberProps> = () => {
  const { teamIdentifier } = useParams()
  const userInfo = useSelector(getCurrentUser)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const members = useSelector(getCurrentMemberList) ?? []
  const [_hasAppOrResource, setHasAppOrResource] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const teamId = teamInfo?.id
  const currentTeamMemberID = teamInfo?.teamMemberID
  const inviteLinkEnabled = teamInfo?.permission.inviteLinkEnabled ?? false
  const allowEditorManageTeamMember =
    teamInfo?.permission.allowEditorManageTeamMember ?? false
  const allowViewerManageTeamMember =
    teamInfo?.permission.allowViewerManageTeamMember ?? false

  const updateMemberList = useCallback(async () => {
    if (!loading) {
      setLoading(true)
      await updateMembers()
      setLoading(false)
    }
  }, [loading])

  const handleRemoveTeamMembers = useCallback(
    async (teamMemberID: string) => {
      try {
        const res = await removeTeamMembers(teamMemberID)
        if (teamMemberID === currentTeamMemberID) {
          window.location.reload()
        }
        return res
      } catch (e) {
        leaveTeamErrorHandler(e)
        return false
      }
    },
    [currentTeamMemberID],
  )

  const getBuilderInfo = useCallback(async () => {
    const res = await fetchBuilderDesc()
    if (res.data) {
      const { appNum, resourceNum } = res.data
      setHasAppOrResource(appNum > 0 || resourceNum > 0)
    }
  }, [])

  const handleChangeTeamMembersRole = useCallback(
    (teamMemberID: string, userRole: USER_ROLE) => {
      return changeTeamMembersRole(teamMemberID, userRole).then((res) => {
        if (userRole === USER_ROLE.OWNER) {
          updateTeamsInfo(teamIdentifier)
        }
        updateMemberList()
        return res
      })
    },
    [updateMemberList, teamIdentifier],
  )

  useEffect(() => {
    if (teamId) {
      updateMemberList()
      getBuilderInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBuilderInfo, teamId])

  if (!userInfo?.userId || !teamInfo) {
    return null
  }

  return (
    <MemberList
      isCloudVersion={isCloudVersion}
      loading={false}
      userListData={members}
      currentUserID={userInfo?.userId}
      currentUserRole={teamInfo?.myRole}
      currentTeamMemberID={teamInfo?.teamMemberID}
      currentTeamLicense={teamInfo?.currentTeamLicense}
      totalTeamLicense={teamInfo?.totalTeamLicense}
      removeTeam={removeTeam}
      fetchInviteLink={fetchInviteLink}
      renewInviteLink={fetchRenewInviteLink}
      teamName={"ILLA"}
      userNickname={userInfo.nickname}
      configInviteLink={setInviteLinkEnabled}
      allowInviteByLink={inviteLinkEnabled}
      allowEditorManageTeamMember={allowEditorManageTeamMember}
      allowViewerManageTeamMember={allowViewerManageTeamMember}
      inviteByEmail={inviteByEmail}
      removeTeamMembers={handleRemoveTeamMembers}
      changeTeamMembersRole={handleChangeTeamMembersRole}
      updateTeamPermissionConfig={updateTeamPermissionConfig}
    />
  )
}

export default Member

Member.displayName = "Member"
