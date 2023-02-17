import { FC, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "@/api/base"
import {
  changeTeamMembersRole,
  fetchInviteLink,
  getMembers,
  inviteByEmail,
  removeTeam,
  removeTeamMembers,
  renewInviteLink,
  setInviteLinkEnabled,
  updateTeamPermissionConfig,
} from "@/api/team"
import { MemberList } from "@/illa-public-component/MemberList"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { BuilderCardInfo, MemberProps } from "@/page/Member/interface"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { MemberInfo } from "@/redux/team/teamState"
import { isCloudVersion } from "@/utils/typeHelper"

export const Member: FC<MemberProps> = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()
  const userInfo = useSelector(getCurrentUser)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const [members, setMembers] = useState<MemberInfo[]>([])
  const [hasAppOrResource, setHasAppOrResource] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    teamId,
    currentTeamMemberID,
    inviteLinkEnabled,
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
  } = useMemo(() => {
    return {
      teamId: teamInfo?.id,
      currentTeamMemberID: teamInfo?.teamMemberID,
      inviteLinkEnabled: teamInfo?.permission.inviteLinkEnabled ?? false,
      allowEditorManageTeamMember:
        teamInfo?.permission.allowEditorManageTeamMember ?? false,
      allowViewerManageTeamMember:
        teamInfo?.permission.allowViewerManageTeamMember ?? false,
    }
  }, [teamInfo])

  const userId = useMemo(() => {
    return userInfo?.userId
  }, [userInfo])

  const updateMemberList = async () => {
    if (!loading) {
      setLoading(true)
      const members = await getMembers()
      if (members) {
        setMembers(members)
      }
      setLoading(false)
    }
  }

  const handleInviteByEmail = (email: string, userRole: USER_ROLE) => {
    return inviteByEmail(email, userRole).then((res) => {
      updateMemberList()
      return res
    })
  }

  const handleChangeTeamMembersRole = (
    teamMemberID: string,
    userRole: USER_ROLE,
  ) => {
    return changeTeamMembersRole(teamMemberID, userRole).then((res) => {
      updateMemberList()
      return res
    })
  }

  const handleRemoveTeamMembers = (teamMemberID: string) => {
    return removeTeamMembers(teamMemberID).then((res) => {
      if (teamMemberID === currentTeamMemberID) {
        window.location.reload()
      }
      updateMemberList()
      return res
    })
  }

  const getBuilderInfo = async (teamId: string) => {
    return new Promise<BuilderCardInfo>(async (resolve, reject) => {
      Api.request<BuilderCardInfo>(
        {
          method: "get",
          url: `/builder/desc`,
        },
        (res) => {
          resolve(res.data)
        },
        (err) => {
          reject(err)
        },
        (err) => {
          reject(err)
        },
      )
    })
  }

  useEffect(() => {
    if (teamId) {
      updateMemberList()
      getBuilderInfo(teamId).then((res) => {
        const { appNum, resourceNum } = res
        setHasAppOrResource(appNum > 0 || resourceNum > 0)
      })
    }
  }, [teamId])

  if (!userId || !teamInfo) {
    return null
  }

  return (
    <MemberList
      isCloudVersion={isCloudVersion}
      loading={false}
      userListData={members}
      currentUserID={userId}
      currentUserRole={teamInfo?.myRole}
      currentTeamMemberID={teamInfo?.teamMemberID}
      removeTeam={removeTeam}
      fetchInviteLink={fetchInviteLink}
      renewInviteLink={renewInviteLink}
      configInviteLink={setInviteLinkEnabled}
      allowInviteByLink={inviteLinkEnabled}
      allowEditorManageTeamMember={allowEditorManageTeamMember}
      allowViewerManageTeamMember={allowViewerManageTeamMember}
      inviteByEmail={handleInviteByEmail}
      removeTeamMembers={handleRemoveTeamMembers}
      changeTeamMembersRole={handleChangeTeamMembersRole}
      updateTeamPermissionConfig={updateTeamPermissionConfig}
    />
  )
}

Member.displayName = "Member"
