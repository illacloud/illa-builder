import {
  FC,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
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
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackProvider } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import {
  canManageApp,
  canUseUpgradeFeature,
} from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { duplicateApp } from "@/page/Dashboard/DashboardApps/AppCardActionItem/utils"
import { AppInviteModal } from "@/page/Dashboard/DashboardApps/AppInviteModal"
import { AppSettingModal } from "@/page/Dashboard/components/AppSettingModal"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { fetchDeleteApp } from "@/services/apps"
import { RootState } from "@/store"
import { track } from "@/utils/mixpanelHelper"
import { isCloudVersion, isILLAAPiError } from "@/utils/typeHelper"

export interface AppCardActionItemProps extends HTMLAttributes<HTMLDivElement> {
  appId: string
  canEditApp: boolean
  isDeploy: boolean
}

export const AppCardActionItem: FC<AppCardActionItemProps> = (props) => {
  const { appId, canEditApp, isDeploy, ...rest } = props

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
  const teamInfo = useSelector(getCurrentTeamInfo)
  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [shareVisible, setShareVisible] = useState(false)
  const [appSettingVisible, setAppSettingVisible] = useState(false)
  const [duplicateLoading, setDuplicateLoading] = useState(false)

  const canSetPublic = canManageApp(
    teamInfo?.myRole ?? USER_ROLE.VIEWER,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const closeInviteModal = () => {
    setShareVisible(false)
  }

  const handleDuplicateApp = () => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "app_duplicate",
      parameter5: appId,
    })
    if (duplicateLoading) return
    setDuplicateLoading(true)
    duplicateApp(app.appId, app.appName)
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
      handleUpgradeModalVisible(true, "upgrade")
      return
    }
    setShareVisible(true)
  }, [appId, canUseBillingFeature, handleUpgradeModalVisible])

  useEffect(() => {
    if (canEditApp || (isDeploy && canSetPublic)) {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "app_more", parameter5: appId },
      )
    }
  }, [canEditApp, isDeploy, canSetPublic, appId])

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

  return (
    <div {...rest}>
      {canEditApp ? (
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
          }}
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
                onClick={() => {
                  track(
                    ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                    { element: "app_delete", parameter5: appId },
                  )
                  track(
                    ILLA_MIXPANEL_EVENT_TYPE.SHOW,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                    { element: "app_delete_modal", parameter5: appId },
                  )
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
                      fetchDeleteApp(app.appId)
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
                }}
              />
            </DropList>
          }
        >
          <Button colorScheme="grayBlue" leftIcon={<MoreIcon size="14px" />} />
        </Dropdown>
      ) : isDeploy && canSetPublic ? (
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
                onClick={() => {
                  setShareVisible(true)
                  track(
                    ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                    { element: "app_share", parameter5: appId },
                  )
                }}
              />
            </DropList>
          }
        >
          <Button colorScheme="grayBlue" leftIcon={<MoreIcon size="14px" />} />
        </Dropdown>
      ) : null}
      <MixpanelTrackProvider
        basicTrack={track}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP}
      >
        <AppInviteModal
          appInfo={app}
          visible={shareVisible}
          handleCloseModal={closeInviteModal}
        />
      </MixpanelTrackProvider>
      <AppSettingModal
        appInfo={app}
        visible={appSettingVisible}
        onVisibleChange={(visible) => {
          setAppSettingVisible(visible)
        }}
        onOk={() => {
          track(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
            {
              element: "app_setting_modal_save",
              parameter5: app.appId,
            },
          )
        }}
        onCancel={() => {
          track(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
            {
              element: "app_setting_modal_close",
              parameter5: app.appId,
            },
          )
        }}
      />
    </div>
  )
}

AppCardActionItem.displayName = "AppCardActionItem"
