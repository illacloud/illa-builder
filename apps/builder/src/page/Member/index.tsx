import { FC, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { BuilderApi } from "@/api/base"
import {
  changeTeamMembersRole,
  fetchInviteLink,
  inviteByEmail,
  removeTeam,
  removeTeamMembers,
  renewInviteLink,
  setInviteLinkEnabled,
  updateMembers,
  updateTeamPermissionConfig,
  updateTeamsInfo,
} from "@/api/team"
import { MemberList } from "@/illa-public-component/MemberList"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { BuilderCardInfo, MemberProps } from "@/page/Member/interface"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getCurrentTeamInfo, getMemberList } from "@/redux/team/teamSelector"
import { isCloudVersion } from "@/utils/typeHelper"

export const Member: FC<MemberProps> = (props) => {
  const { teamIdentifier } = useParams()
  const userInfo = useSelector(getCurrentUser)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const members = useSelector(getMemberList) ?? []
  const [hasAppOrResource, setHasAppOrResource] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const teamId = teamInfo?.id
  const currentTeamMemberID = teamInfo?.teamMemberID
  const inviteLinkEnabled = teamInfo?.permission.inviteLinkEnabled ?? false
  const allowEditorManageTeamMember =
    teamInfo?.permission.allowEditorManageTeamMember ?? false
  const allowViewerManageTeamMember =
    teamInfo?.permission.allowViewerManageTeamMember ?? false

  const updateMemberList = async () => {
    if (!loading) {
      setLoading(true)
      await updateMembers()
      setLoading(false)
    }
  }

  const handleRemoveTeamMembers = (teamMemberID: string) => {
    return removeTeamMembers(teamMemberID).then((res) => {
      if (teamMemberID === currentTeamMemberID) {
        window.location.reload()
      }
      return res
    })
  }

  const getBuilderInfo = async () => {
    const res = await BuilderApi.asyncTeamRequest<BuilderCardInfo>({
      method: "get",
      url: `/builder/desc`,
    })
    if (res.data) {
      const { appNum, resourceNum } = res.data
      setHasAppOrResource(appNum > 0 || resourceNum > 0)
    }
  }

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
  }, [teamId])

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
      removeTeam={removeTeam}
      fetchInviteLink={fetchInviteLink}
      renewInviteLink={renewInviteLink}
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
