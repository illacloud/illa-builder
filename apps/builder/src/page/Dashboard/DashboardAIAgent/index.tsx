import { InviteMemberPC } from "@illa-public/invite-modal"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  USER_ROLE,
  getCurrentTeamInfo,
  getCurrentUser,
  getPlanUtils,
  teamActions,
} from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
  openInviteModal,
} from "@illa-public/user-role-utils"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useBeforeUnload, useNavigate } from "react-router-dom"
import { AgentContent } from "@/page/Dashboard/DashboardAIAgent/AgentContent"
import { containerStyle } from "@/page/Dashboard/DashboardAIAgent/style"
import { DashboardContentHeader } from "@/page/Dashboard/components/DashboardContentHeader"
import { copyToClipboard } from "@/utils/copyToClipboard"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"

const DashboardAIAgent: FC = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const currentUserInfo = useSelector(getCurrentUser)

  const dispatch = useDispatch()

  const canCreateAgent = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.AI_AGENT,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.CREATE_AI_AGENT,
  )

  const upgradeModal = useUpgradeModal()

  const [showInvite, setShowInvite] = useState(false)

  const handleCreateAgent = useCallback(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
      {
        element: "create_new_app",
      },
    )
    navigate(`/${teamInfo.identifier}/ai-agent`)
  }, [navigate, teamInfo.identifier])

  const handleInviteAgent = useCallback(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
      {
        element: "invite",
      },
    )
    if (!openInviteModal(teamInfo)) {
      upgradeModal({
        modalType: "upgrade",
      })
      return
    }
    setShowInvite(true)
  }, [teamInfo, upgradeModal])

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD)
  })

  return (
    <>
      <div css={containerStyle}>
        <DashboardContentHeader
          icon={teamInfo.icon}
          name={teamInfo.name}
          onCreate={handleCreateAgent}
          onInvite={handleInviteAgent}
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
