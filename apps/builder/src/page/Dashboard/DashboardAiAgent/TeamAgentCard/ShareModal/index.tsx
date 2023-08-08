import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { ERROR_FLAG } from "@/api/errorFlag"
import { REDIRECT_PAGE_TYPE } from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import TeamAgentShareModal from "@/illa-public-market-component/TeamAgentShareModal"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import {
  getCurrentMemberList,
  getCurrentTeamInfo,
} from "@/redux/team/teamSelector"
import { fetchShareAgentLink, shareAgentByEmail } from "@/services/agent"
import { contributeAiAgent } from "@/services/marketPlace"
import {
  changeTeamMembersRole,
  updateMembers,
  updateTeamsInfo,
} from "@/services/team"
import { isILLAAPiError } from "@/utils/typeHelper"

export interface AgentShareModalProps {
  visible: boolean
  onCancel: () => void
  aiAgentID: string
  aiAgentName: string
  publishedToMarketplace: boolean
}
const AgentShareModal: FC<AgentShareModalProps> = (props) => {
  const { aiAgentID, aiAgentName, publishedToMarketplace, visible, onCancel } =
    props

  const message = useMessage()
  const { t } = useTranslation()
  const { teamIdentifier } = useParams()

  const userInfo = useSelector(getCurrentUser)
  const teamInfo = useSelector(getCurrentTeamInfo)!
  const members = useSelector(getCurrentMemberList) ?? []
  const agentLink = `${location.protocol}//${location.host}/${aiAgentID}/detail`

  const handleChangeTeamMembersRole = (
    teamMemberID: string,
    userRole: USER_ROLE,
  ) => {
    return changeTeamMembersRole(teamMemberID, userRole)
      .then((res) => {
        if (userRole === USER_ROLE.OWNER) {
          message.success({
            content: t("user_management.mes.transfer_suc"),
          })
          updateTeamsInfo(teamIdentifier)
        } else {
          message.success({
            content: t("user_management.mes.change_role_suc"),
          })
        }
        updateMembers()
        return res
      })
      .catch((error) => {
        if (isILLAAPiError(error)) {
          switch (error.data.errorFlag) {
            case ERROR_FLAG.ERROR_FLAG_ACCESS_DENIED:
            case ERROR_FLAG.ERROR_FLAG_CAN_NOT_INCREASE_TEAM_MEMBER_DUE_TO_NO_BALANCE:
              message.error({
                content: t("user_management.mes.change_role_fail"),
              })
              break
            case ERROR_FLAG.ERROR_FLAG_CAN_NOT_UPDATE_TEAM_MEMBER_ROLE_BECAUSE_APPSUMO_BUYER:
              message.error({
                content: t("billing.message.appsumo.transfer"),
              })
              break
            default:
              if (userRole === USER_ROLE.OWNER) {
                message.error({
                  content: t("user_management.mes.transfer_fail"),
                })
              } else {
                message.error({
                  content: t("user_management.mes.change_role_fail"),
                })
              }
              break
          }
        }
        return false
      })
  }

  const handleInviteByEmail = useCallback(
    (email: string, userRole: USER_ROLE, redirectPage?: REDIRECT_PAGE_TYPE) => {
      return shareAgentByEmail(email, userRole, aiAgentID, redirectPage).then(
        (res) => {
          updateMembers()
          return res
        },
      )
    },
    [aiAgentID],
  )

  const fetchShareLink = useCallback(
    (userRole: USER_ROLE, redirectPage?: REDIRECT_PAGE_TYPE) => {
      return fetchShareAgentLink(userRole, aiAgentID, redirectPage)
    },
    [aiAgentID],
  )

  const contributeToMarketplace = useCallback(() => {
    return contributeAiAgent(aiAgentID)
  }, [aiAgentID])

  return (
    <TeamAgentShareModal
      visible={visible}
      onCancel={onCancel}
      agentName={aiAgentName}
      agentLink={agentLink}
      publishedToMarketplace={publishedToMarketplace}
      currentUserRole={teamInfo?.myRole}
      teamName={teamInfo?.name}
      userNickname={userInfo.nickname}
      userListData={members}
      fetchInviteLink={fetchShareLink}
      inviteByEmail={handleInviteByEmail}
      changeTeamMembersRole={handleChangeTeamMembersRole}
      contributeToMarketplace={contributeToMarketplace}
    />
  )
}

AgentShareModal.displayName = "AgentShareModal"

export default AgentShareModal
