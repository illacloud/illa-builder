import { ShareAppPC } from "@illa-public/invite-modal"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  getCurrentTeamInfo,
  getCurrentUser,
  getPlanUtils,
  teamActions,
} from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
  canManageInvite,
  canUseUpgradeFeature,
  openShareAppModal,
  showShareAppModal,
} from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
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
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { fetchDeleteApp } from "@/services/apps"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { track } from "@/utils/mixpanelHelper"
import { isILLAAPiError } from "@/utils/typeHelper"

export const AppCardActionItem: FC<AppCardActionItemProps> = (props) => {
  const { appInfo } = props

  const { t } = useTranslation()
  const message = useMessage()
  const modal = useModal()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const canEditApp = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.APP,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.EDIT_APP,
  )

  const currentUserInfo = useSelector(getCurrentUser)

  const upgradeModal = useUpgradeModal()
  const [shareVisible, setShareVisible] = useState(false)
  const [appSettingVisible, setAppSettingVisible] = useState(false)
  const [duplicateLoading, setDuplicateLoading] = useState(false)

  const showInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const handleDuplicateApp = () => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_duplicate",
      parameter5: appInfo.appId,
    })
    if (duplicateLoading) return
    setDuplicateLoading(true)
    duplicateApp(appInfo.appId, appInfo.appName)
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
      parameter5: appInfo.appId,
    })
  }

  const handleOpenInviteModal = useCallback(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_share",
      parameter5: appInfo.appId,
    })
    if (
      !openShareAppModal(
        teamInfo,
        teamInfo.myRole,
        appInfo.config.public,
        appInfo.config.publishedToMarketplace,
      )
    ) {
      upgradeModal({
        modalType: "upgrade",
      })
      return
    }
    setShareVisible(true)
  }, [
    appInfo.appId,
    appInfo.config.public,
    appInfo.config.publishedToMarketplace,
    teamInfo,
    upgradeModal,
  ])

  const handleDeleteApp = useCallback(() => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_delete",
      parameter5: appInfo.appId,
    })
    track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_delete_modal",
      parameter5: appInfo.appId,
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
      maskClosable: false,
      onOk: () => {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          {
            element: "app_delete_modal_delete",
            parameter5: appInfo.appId,
          },
        )
        modal.update(modalId, {
          okLoading: true,
        })
        fetchDeleteApp(appInfo.appId)
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
            parameter5: appInfo.appId,
          },
        )
      },
    })
  }, [appInfo.appId, dispatch, modal, message, t])

  const onVisibleChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "app_more", parameter5: appInfo.appId },
        )
        track(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "app_duplicate", parameter5: appInfo.appId },
        )
        track(
          ILLA_MIXPANEL_EVENT_TYPE.SHOW,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "app_delete", parameter5: appInfo.appId },
        )
        appInfo.deployed &&
          track(
            ILLA_MIXPANEL_EVENT_TYPE.SHOW,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
            { element: "app_share", parameter5: appInfo.appId },
          )
      }
    },
    [appInfo.appId, appInfo.deployed],
  )

  useEffect(() => {
    if (canEditApp || (appInfo.deployed && showInvite)) {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "app_more", parameter5: appInfo.appId },
      )
    }
  }, [canEditApp, appInfo.deployed, showInvite, appInfo.appId])

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
        { element: "invite_modal", parameter5: appInfo.appId },
      )
  }, [appInfo.appId, shareVisible])

  useEffect(() => {
    appSettingVisible &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "app_setting_modal", parameter5: appInfo.appId },
      )
  }, [appInfo.appId, appSettingVisible])

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {canEditApp ? (
        <Dropdown
          position="bottom-end"
          trigger="click"
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
              {showShareAppModal(
                teamInfo,
                teamInfo.myRole,
                appInfo.config.public,
                appInfo.config.publishedToMarketplace,
                appInfo.deployed,
              ) && (
                <DropListItem
                  key="share"
                  value="share"
                  title={
                    <div>
                      <DependencyIcon mr="8px" />
                      <span>{t("share")}</span>
                    </div>
                  }
                  onClick={handleOpenInviteModal}
                />
              )}
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
      ) : (
        showShareAppModal(
          teamInfo,
          teamInfo.myRole,
          appInfo.config.public,
          appInfo.config.publishedToMarketplace,
          appInfo.deployed,
        ) && (
          <Dropdown
            position="bottom-end"
            trigger="click"
            triggerProps={{ closeDelay: 0, openDelay: 0 }}
            onVisibleChange={(visible) => {
              if (visible) {
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                  { element: "app_more", parameter5: appInfo.appId },
                )
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                  { element: "app_share", parameter5: appInfo.appId },
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
                  onClick={handleOpenInviteModal}
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
        )
      )}
      <MixpanelTrackProvider
        basicTrack={track}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP}
      >
        {shareVisible && (
          <ShareAppPC
            isDeployed={appInfo.deployed}
            title={t("user_management.modal.social_media.default_text.app", {
              appName: appInfo.appName,
            })}
            editRedirectURL={`${window.location.origin}/${teamInfo.identifier}/app/${appInfo.appId}`}
            useRedirectURL={`${window.location.origin}/${teamInfo.identifier}/deploy/app/${appInfo.appId}`}
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
            defaultBalance={
              isCloudVersion ? teamInfo.currentTeamLicense.balance : Infinity
            }
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
            defaultAppPublic={appInfo.config.public}
            defaultAppContribute={appInfo.config.publishedToMarketplace}
            appID={appInfo.appId}
            userRoleForThisApp={teamInfo.myRole}
            ownerTeamID={teamInfo.id}
            ownerTeamIdentify={teamInfo.identifier}
            onAppPublic={(isPublic) => {
              dispatch(
                dashboardAppActions.updateDashboardAppPublicReducer({
                  appId: appInfo.appId,
                  isPublic: isPublic,
                }),
              )
            }}
            onAppContribute={(isContributed) => {
              dispatch(
                dashboardAppActions.updateDashboardAppContributeReducer({
                  appId: appInfo.appId,
                  publishedToMarketplace: isContributed,
                }),
              )
              if (isContributed) {
                dispatch(
                  dashboardAppActions.updateDashboardAppDeployedReducer({
                    appId: appInfo.appId,
                    deployed: true,
                  }),
                )
              }
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
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
                {
                  element: "invite_modal_public_copy",
                  parameter5: appInfo.appId,
                },
              )
              copyToClipboard(
                t("user_management.modal.contribute.default_text.app", {
                  appName: appInfo.appName,
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
            onShare={(name) => {
              const { publishedToMarketplace } = appInfo.config
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
                {
                  element: "share_modal_social_media",
                  parameter1: publishedToMarketplace,
                  parameter4: name,
                  parameter5: appInfo.appId,
                },
              )
            }}
          />
        )}
      </MixpanelTrackProvider>
      <AppSettingModal
        appInfo={appInfo}
        visible={appSettingVisible}
        onVisibleChange={(visible) => {
          setAppSettingVisible(visible)
        }}
        onSaveEvent={() => {
          track(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
            {
              element: "app_setting_modal_save",
              parameter5: appInfo.appId,
            },
          )
        }}
        onCloseEvent={() => {
          track(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
            {
              element: "app_setting_modal_close",
              parameter5: appInfo.appId,
            },
          )
        }}
      />
    </div>
  )
}

AppCardActionItem.displayName = "AppCardActionItem"
