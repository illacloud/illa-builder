import { InviteMemberPC } from "@illa-public/invite-modal"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  USER_ROLE,
  currentUserActions,
  getCurrentTeamInfo,
  getCurrentUser,
  getIsTutorialViewed,
  getPlanUtils,
  teamActions,
} from "@illa-public/user-data"
import {
  canManage,
  canManageInvite,
  openInviteModal,
} from "@illa-public/user-role-utils"
import { ACTION_MANAGE, ATTRIBUTE_GROUP } from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useBeforeUnload, useNavigate } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { BASIC_APP_CONFIG } from "@/config/newAppConfig"
import { DashboardContentHeader } from "@/page/Dashboard/components/DashboardContentHeader"
import { openGuideModal } from "@/page/Template/gideModeModal"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { fetchCreateApp } from "@/services/apps"
import { copyToClipboard } from "@/utils/copyToClipboard"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"
import { AppsContent } from "./AppContent"
import { appsContainerStyle } from "./style"

export const DashboardApps: FC = () => {
  const { t } = useTranslation()
  const message = useMessage()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isTutorialViewed = useSelector(getIsTutorialViewed)
  const upgradeModal = useUpgradeModal()
  const currentUserInfo = useSelector(getCurrentUser)

  const [loading, setLoading] = useState(false)
  const [inviteModalVisible, setInviteModalVisible] = useState(false)

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const canCreateApp = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.APP,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.CREATE_APP,
  )

  const showInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )

  const canEditApp = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.APP,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.EDIT_APP,
  )
  const handleCreateApp = useCallback(async () => {
    setLoading(true)
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "create_new_app",
    })
    try {
      const resp = await fetchCreateApp({
        appName: "Untitled app",
        initScheme: BASIC_APP_CONFIG,
      })
      dispatch(
        dashboardAppActions.addDashboardAppReducer({
          app: resp.data,
        }),
      )
      navigate(`/${teamInfo.identifier}/app/${resp.data.appId}`)
    } catch (e) {
      message.error({ content: t("create_fail") })
    } finally {
      setLoading(false)
    }
  }, [dispatch, navigate, teamInfo.identifier, message, t])

  useEffect(() => {
    if (!isTutorialViewed && canEditApp) {
      openGuideModal(teamInfo.identifier)
      dispatch(currentUserActions.updateUserIsTutorialViewedReducer(true))
    }
  }, [dispatch, canEditApp, isTutorialViewed, teamInfo.identifier])

  useEffect(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.VISIT, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP)
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP)
  })

  useEffect(() => {
    canCreateApp &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "create_new_app" },
      )
  }, [canCreateApp])

  return (
    <div css={appsContainerStyle}>
      <DashboardContentHeader
        icon={teamInfo.icon}
        name={teamInfo.name}
        onCreate={async () => {
          await handleCreateApp()
        }}
        onInvite={() => {
          if (!openInviteModal(teamInfo)) {
            upgradeModal({
              modalType: "upgrade",
            })
            return
          }
          setInviteModalVisible(true)
        }}
        canCreate={canCreateApp}
        isCreateLoading={loading}
      />
      <AppsContent onCreatedApp={handleCreateApp} loading={loading} />
      {inviteModalVisible && (
        <InviteMemberPC
          redirectURL={`${window.location.origin}/${teamInfo?.identifier}/dashboard/apps`}
          onClose={() => setInviteModalVisible(false)}
          canInvite={showInvite}
          currentUserRole={teamInfo.myRole}
          defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
          defaultInviteUserRole={USER_ROLE.VIEWER}
          defaultBalance={
            isCloudVersion ? teamInfo.currentTeamLicense.balance : Infinity
          }
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
    </div>
  )
}

export default DashboardApps

DashboardApps.displayName = "DashboardApps"
