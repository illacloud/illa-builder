import { InviteMemberPC } from "@illa-public/invite-modal"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  USER_ROLE,
  getCurrentTeamInfo,
  getCurrentUser,
  teamActions,
} from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
  openInviteModal,
} from "@illa-public/user-role-utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AgentContent } from "@/page/Dashboard/DashboardAIAgent/AgentContent"
import { containerStyle } from "@/page/Dashboard/DashboardAIAgent/style"
import { DashboardContentHeader } from "@/page/Dashboard/components/DashboardContentHeader"
import { copyToClipboard } from "@/utils/copyToClipboard"

const DashboardAIAgent: FC = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const currentUserInfo = useSelector(getCurrentUser)

  const dispatch = useDispatch()

  const canCreateAgent = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.AGENT,
    ACTION_MANAGE.CREATE_AGENT,
  )

  const upgradeModal = useUpgradeModal()

  const [showInvite, setShowInvite] = useState(false)

  return (
    <>
      <div css={containerStyle}>
        <DashboardContentHeader
          icon={teamInfo.icon}
          name={teamInfo.name}
          onCreate={() => {
            navigate(`/${teamInfo.identifier}/ai-agent`)
          }}
          onInvite={() => {
            if (!openInviteModal(teamInfo)) {
              upgradeModal({
                modalType: "upgrade",
              })
              return
            }
            setShowInvite(true)
          }}
          canCreate={canCreateAgent}
          isCreateLoading={false}
        />
        <AgentContent />
      </div>
      {showInvite && (
        <InviteMemberPC
          redirectURL={`${window.location.origin}/${teamInfo?.identifier}/dashboard/ai-agents`}
          onClose={() => setShowInvite(false)}
          canInvite={showInvite}
          currentUserRole={teamInfo.myRole}
          defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
          defaultInviteUserRole={USER_ROLE.VIEWER}
          defaultBalance={teamInfo.currentTeamLicense.balance}
          onCopyInviteLink={(inviteLink) => {
            copyToClipboard(
              t("user_management.modal.custom_copy_text", {
                inviteLink: inviteLink,
                teamName: teamInfo.name,
                userName: currentUserInfo.nickname,
              }),
            )
          }}
          onInviteLinkStateChange={(isInviteLink) => {
            dispatch(
              teamActions.updateTeamMemberPermissionReducer({
                teamID: teamInfo.id,
                newPermission: {
                  ...teamInfo.permission,
                  inviteLinkEnabled: isInviteLink,
                },
              }),
            )
          }}
          teamID={teamInfo.id}
          onBalanceChange={(balance) => {
            dispatch(
              teamActions.updateTeamMemberSubscribeReducer({
                teamID: teamInfo.id,
                subscribeInfo: {
                  ...teamInfo.currentTeamLicense,
                  balance: balance,
                },
              }),
            )
          }}
        />
      )}
    </>
  )
}

export default DashboardAIAgent

DashboardAIAgent.displayName = "DashboardAIAgent"
