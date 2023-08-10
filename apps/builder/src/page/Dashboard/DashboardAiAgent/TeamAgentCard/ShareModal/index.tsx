import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { ERROR_FLAG } from "@/api/errorFlag"
import { REDIRECT_PAGE_TYPE } from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import TeamAgentShareModal, {
  TeamAgentShareModalProps,
} from "@/illa-public-market-component/TeamAgentShareModal"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import {
  getCurrentMemberList,
  getCurrentTeamInfo,
} from "@/redux/team/teamSelector"
import {
  fetchShareAgentLink,
  renewShareAgentLink,
  shareAgentByEmail,
} from "@/services/agent"
import { contributeAiAgent, unlistedAiAgent } from "@/services/marketPlace"
import {
  changeTeamMembersRole,
  setInviteLinkEnabled,
  updateMembers,
  updateTeamsInfo,
} from "@/services/team"
import { isILLAAPiError } from "@/utils/typeHelper"

export interface AgentShareModalProps
  extends Pick<
    TeamAgentShareModalProps,
    "visible" | "onCancel" | "publishedToMarketplace" | "defaultTab"
  > {
  aiAgentID: string
  aiAgentName: string
  onContributed?: (value: boolean) => void
}

const AgentShareModal: FC<AgentShareModalProps> = (props) => {
  const {
    aiAgentID,
    aiAgentName,
    publishedToMarketplace,
    defaultTab,
    visible,
    onCancel,
    onContributed,
  } = props

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

  const renewShareLink = useCallback(
    (userRole: USER_ROLE) => {
      return renewShareAgentLink(userRole, aiAgentID)
    },
    [aiAgentID],
  )

  const contributeToMarketplace = useCallback(
    async (value: boolean) => {
      const res = (await value)
        ? contributeAiAgent(aiAgentID)
        : unlistedAiAgent(aiAgentID)
      onContributed?.(value)
      return res
    },
    [aiAgentID, onContributed],
  )

  return (
    <TeamAgentShareModal
      visible={visible}
      onCancel={onCancel}
      defaultTab={defaultTab}
      agentName={aiAgentName}
      agentLink={agentLink}
      publishedToMarketplace={publishedToMarketplace}
      currentUserRole={teamInfo?.myRole}
      teamName={teamInfo?.name}
      userNickname={userInfo.nickname}
      userListData={members}
      allowInviteByLink={teamInfo?.permission?.inviteLinkEnabled}
      fetchInviteLink={fetchShareLink}
      renewInviteLink={renewShareLink}
      configInviteLink={setInviteLinkEnabled}
      inviteByEmail={handleInviteByEmail}
      changeTeamMembersRole={handleChangeTeamMembersRole}
      contributeToMarketplace={contributeToMarketplace}
    />
  )
}

AgentShareModal.displayName = "AgentShareModal"

export default AgentShareModal
