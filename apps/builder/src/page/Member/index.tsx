import {
  getCurrentMemberList,
  getCurrentTeamInfo,
  getCurrentUser,
} from "@illa-public/user-data"
import { FC, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { MemberProps } from "@/page/Member/interface"
import { fetchBuilderDesc } from "@/services/public"
import { removeTeamMembers, updateMembers } from "@/services/team"
import { leaveTeamErrorHandler } from "@/utils/billing/errorHandler"


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

  return <div></div>
}

export default Member

Member.displayName = "Member"