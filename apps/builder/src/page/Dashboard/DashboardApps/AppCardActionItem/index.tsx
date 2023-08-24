import { ShareAppPC } from "@illa-public/invite-modal"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  USER_ROLE,
  getCurrentTeamInfo,
  getCurrentUser,
  teamActions,
} from "@illa-public/user-data"
import {
  canManageInvite,
  canUseUpgradeFeature,
} from "@illa-public/user-role-utils"
import { isCloudVersion, useCopyToClipboard } from "@illa-public/utils"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  Button,
  CopyIcon,
  DeleteOutlineIcon,
  DependencyIcon,
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  PenIcon,
  useMessage,
  useModal,
} from "@illa-design/react"
import { AppCardActionItemProps } from "@/page/Dashboard/DashboardApps/AppCardActionItem/interface"
import { duplicateApp } from "@/page/Dashboard/DashboardApps/AppCardActionItem/utils"
import { AppSettingModal } from "@/page/Dashboard/components/AppSettingModal"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { fetchDeleteApp } from "@/services/apps"
import { RootState } from "@/store"
import { track } from "@/utils/mixpanelHelper"
import { isILLAAPiError } from "@/utils/typeHelper"

export const AppCardActionItem: FC<AppCardActionItemProps> = (props) => {
  const {
    appId,
    appName,
    canEditApp,
    isPublic,
    isContributed,
    isDeploy,
    ...rest
  } = props

  const { t } = useTranslation()
  const message = useMessage()
  const modal = useModal()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()

  const app = useSelector((state: RootState) => {
    return state.dashboard.dashboardApps.list.find(
      (item) => item.appId === appId,
    )!!
  })
  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const currentUserInfo = useSelector(getCurrentUser)

  const upgradeModal = useUpgradeModal()
  const [shareVisible, setShareVisible] = useState(false)
  const [appSettingVisible, setAppSettingVisible] = useState(false)
  const [duplicateLoading, setDuplicateLoading] = useState(false)
  const copyToClipboard = useCopyToClipboard()

  const showInvite = canManageInvite(
    teamInfo?.myRole ?? USER_ROLE.VIEWER,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const handleDuplicateApp = () => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_duplicate",
      parameter5: appId,
    })
    if (duplicateLoading) return
    setDuplicateLoading(true)
    duplicateApp(appId, app.appName)
      .then(
        (response) => {
          dispatch(
            dashboardAppActions.addDashboardAppReducer({
              app: response.data,
            }),
          )
          navigate(`/${teamIdentifier}/app/${response.data.appId}`)
        },
        (failure) => {
          if (isILLAAPiError(failure)) {
            message.error({
              content: t("dashboard.app.duplicate_fail"),
            })
          } else {
            message.error({
              content: t("network_error"),
            })
          }
        },
      )
      .finally(() => {
        setDuplicateLoading(false)
      })
  }

  const handleOpenAppSettingModal = () => {
    setAppSettingVisible(true)
    track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_setting_modal",
      parameter5: appId,
    })
  }

  const openInviteModal = useCallback(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_share",
      parameter5: appId,
    })
    if (isCloudVersion && !canUseBillingFeature) {
      upgradeModal({
        modalType: "upgrade",
      })
      return
    }
    setShareVisible(true)
  }, [appId, canUseBillingFeature, upgradeModal])

  const handleDeleteApp = useCallback(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_delete",
      parameter5: appId,
    })
    track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_delete_modal",
      parameter5: appId,
    })
    const modalId = modal.show({
      w: "496px",
      blockOkHide: true,
      title: t("dashboard.common.delete_title"),
      children: t("dashboard.common.delete_content"),
      cancelText: t("dashboard.common.delete_cancel_text"),
      okText: t("dashboard.common.delete_ok_text"),
      okButtonProps: {
        colorScheme: "red",
      },
      closable: false,
      onOk: () => {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          {
            element: "app_delete_modal_delete",
            parameter5: appId,
          },
        )
        modal.update(modalId, {
          okLoading: true,
        })
        fetchDeleteApp(appId)
          .then(
            (response) => {
              dispatch(
                dashboardAppActions.removeDashboardAppReducer(
                  response.data.appID,
                ),
              )
              message.success({
                content: t("dashboard.app.trash_success"),
              })
              modal.close(modalId)
            },
            (error) => {
              if (isILLAAPiError(error)) {
                message.success({
                  content: t("dashboard.app.trash_failure"),
                })
              } else {
                message.error({
                  content: t("network_error"),
                })
              }
            },
          )
          .finally(() => {
            modal.update(modalId, {
              okLoading: false,
            })
          })
      },
      onCancel: () => {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          {
            element: "app_delete_modal_close",
            parameter5: appId,
          },
        )
      },
    })
  }, [appId, dispatch, modal, message, t])

  const onVisibleChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "app_more", parameter5: appId },
        )
        track(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "app_duplicate", parameter5: appId },
        )
        track(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "app_delete", parameter5: appId },
        )
        isDeploy &&
          track(
            ILLA_MIXPANEL_EVENT_TYPE.SHOW,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
            { element: "app_share", parameter5: appId },
          )
      }
    },
    [appId, isDeploy],
  )

  const onAppSettingOk = useCallback(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_setting_modal_save",
      parameter5: appId,
    })
  }, [appId])

  const onAppSettingCancel = useCallback(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_setting_modal_close",
      parameter5: appId,
    })
  }, [appId])

  useEffect(() => {
    if (canEditApp || (isDeploy && showInvite)) {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "app_more", parameter5: appId },
      )
    }
  }, [canEditApp, isDeploy, showInvite, appId])

  useEffect(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app",
    })
  }, [])

  useEffect(() => {
    shareVisible &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "invite_modal", parameter5: appId },
      )
  }, [appId, shareVisible])

  useEffect(() => {
    appSettingVisible &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "app_setting_modal", parameter5: appId },
      )
  }, [appId, appSettingVisible])

  return (
    <div {...rest}>
      {canEditApp ? (
        <Dropdown
          position="bottom-end"
          trigger="click"
          triggerProps={{ closeDelay: 0, openDelay: 0 }}
          onVisibleChange={onVisibleChange}
          dropList={
            <DropList w={"184px"}>
              <DropListItem
                key="rename"
                value="rename"
                title={
                  <div>
                    <PenIcon mr="8px" />
                    <span>{t("new_dashboard.app_setting.app_setting")}</span>
                  </div>
                }
                onClick={handleOpenAppSettingModal}
              />
              <DropListItem
                key="share"
                value="share"
                title={
                  <div>
                    <DependencyIcon mr="8px" />
                    <span>{t("share")}</span>
                  </div>
                }
                onClick={openInviteModal}
              />
              <DropListItem
                key="duplicate"
                value="duplicate"
                title={
                  <div>
                    <CopyIcon mr="8px" />
                    <span>{t("duplicate")}</span>
                  </div>
                }
                onClick={handleDuplicateApp}
              />
              <DropListItem
                key="delete"
                value="delete"
                title={
                  <div>
                    <DeleteOutlineIcon mr="8px" />
                    <span>{t("dashboard.common.delete")}</span>
                  </div>
                }
                deleted
                onClick={handleDeleteApp}
              />
            </DropList>
          }
        >
          <Button
            variant="text"
            colorScheme="grayBlue"
            leftIcon={<MoreIcon size="14px" />}
          />
        </Dropdown>
      ) : isDeploy && showInvite ? (
        // for viewer
        <Dropdown
          position="bottom-end"
          trigger="click"
          triggerProps={{ closeDelay: 0, openDelay: 0 }}
          onVisibleChange={(visible) => {
            if (visible) {
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                { element: "app_more", parameter5: appId },
              )
              track(
                ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                { element: "app_share", parameter5: appId },
              )
            }
          }}
          dropList={
            <DropList w={"184px"}>
              <DropListItem
                key="share"
                value="share"
                title={
                  <div>
                    <DependencyIcon mr="8px" />
                    <span>{t("share")}</span>
                  </div>
                }
                onClick={openInviteModal}
              />
            </DropList>
          }
        >
          <Button
            variant="text"
            colorScheme="grayBlue"
            leftIcon={<MoreIcon size="14px" />}
          />
        </Dropdown>
      ) : null}
      <MixpanelTrackProvider
        basicTrack={track}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP}
      >
        {shareVisible && (
          <ShareAppPC
            redirectUrl={`${
              import.meta.env.ILLA_BUILDER_URL
            }/${teamIdentifier}/dashboard/apps`}
            defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
            onInviteLinkStateChange={(enableInviteLink) => {
              dispatch(
                teamActions.updateTeamMemberPermissionReducer({
                  teamID: teamInfo.id,
                  newPermission: {
                    ...teamInfo.permission,
                    inviteLinkEnabled: enableInviteLink,
                  },
                }),
              )
            }}
            onClose={() => {
              setShareVisible(false)
            }}
            canInvite={showInvite}
            defaultBalance={teamInfo.currentTeamLicense.balance}
            teamID={teamInfo.id}
            currentUserRole={teamInfo.myRole}
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
            defaultAppPublic={isPublic}
            defaultAppContribute={isContributed}
            appID={appId}
            userRoleForThisApp={teamInfo.myRole}
            ownerTeamID={teamInfo.id}
            ownerTeamIdentify={teamInfo.identifier}
            onAppPublic={(isPublic) => {
              dispatch(appInfoActions.updateAppPublicReducer(isPublic))
            }}
            onAppContribute={(isContributed) => {
              dispatch(appInfoActions.updateAppContributeReducer(isContributed))
            }}
            onCopyPublicLink={(link) => {
              copyToClipboard(
                t("user_management.modal.custom_copy_text_app_invite", {
                  userName: currentUserInfo.nickname,
                  teamName: teamInfo.name,
                  inviteLink: link,
                }),
              )
            }}
            onCopyContributeLink={(link) => {
              copyToClipboard(
                t("user_management.modal.contribute.default_text.app", {
                  appName: appName,
                  appLink: link,
                }),
              )
            }}
            onCopyEditInviteLink={(link) => {
              copyToClipboard(
                t("user_management.modal.custom_copy_text_app_invite", {
                  userName: currentUserInfo.nickname,
                  teamName: teamInfo.name,
                  inviteLink: link,
                }),
              )
            }}
            onCopyUseInviteLink={(link) => {
              copyToClipboard(
                t("user_management.modal.custom_copy_text_app_invite", {
                  userName: currentUserInfo.nickname,
                  teamName: teamInfo.name,
                  inviteLink: link,
                }),
              )
            }}
            canUseBillingFeature={canUseBillingFeature}
          />
        )}
      </MixpanelTrackProvider>
      <AppSettingModal
        appInfo={app}
        visible={appSettingVisible}
        onVisibleChange={(visible) => {
          setAppSettingVisible(visible)
        }}
        onOk={onAppSettingOk}
        onCancel={onAppSettingCancel}
      />
    </div>
  )
}

AppCardActionItem.displayName = "AppCardActionItem"
