import { FC, HTMLAttributes, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
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
import { ERROR_FLAG } from "@/api/errorFlag"
import { InviteModal } from "@/illa-public-component/MemberList/components/Header/InviteModal"
import { MemberListContext } from "@/illa-public-component/MemberList/context/MemberListContext"
import {
  SubscribeInfo,
  TotalTeamLicense,
} from "@/illa-public-component/MemberList/interface"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackProvider } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { canManageApp } from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { DuplicateModal } from "@/page/Dashboard/components/DuplicateModal"
import { RenameModal } from "@/page/Dashboard/components/RenameModal"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import {
  getCurrentMemberList,
  getCurrentTeamInfo,
} from "@/redux/team/teamSelector"
import {
  fetchDeleteApp,
  fetchShareAppLink,
  renewShareAppLink,
  shareAppByEmail,
  updateAppPublicConfig,
} from "@/services/apps"
import {
  changeTeamMembersRole,
  setInviteLinkEnabled,
  updateMembers,
  updateTeamsInfo,
} from "@/services/team"
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
  const { teamIdentifier } = useParams()

  const app = useSelector((state: RootState) => {
    return state.dashboard.dashboardApps.list.find(
      (item) => item.appId === appId,
    )!!
  })
  const teamInfo = useSelector(getCurrentTeamInfo)
  const currentUserInfo = useSelector(getCurrentUser)

  const [shareVisible, setShareVisible] = useState(false)
  const [renameVisible, setRenameVisible] = useState(false)
  const [duplicateVisible, setDuplicateVisible] = useState(false)

  const members = useSelector(getCurrentMemberList) ?? []
  const {
    inviteLinkEnabled,
    currentUserRole,
    allowEditorManageTeamMember,
    allowViewerManageTeamMember,
  } = {
    currentUserRole: teamInfo?.myRole ?? USER_ROLE.VIEWER,
    inviteLinkEnabled: teamInfo?.permission.inviteLinkEnabled ?? false,
    allowEditorManageTeamMember:
      teamInfo?.permission.allowEditorManageTeamMember ?? false,
    allowViewerManageTeamMember:
      teamInfo?.permission.allowViewerManageTeamMember ?? false,
  }

  const canSetPublic = canManageApp(
    currentUserRole,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  const handleInviteByEmail = (email: string, userRole: USER_ROLE) => {
    return shareAppByEmail(email, userRole, appId).then((res) => {
      updateMembers()
      return res
    })
  }

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

  const closeInviteModal = () => {
    setShareVisible(false)
  }

  const fetchShareLink = (userRole: USER_ROLE) => {
    return fetchShareAppLink(userRole, appId)
  }
  const renewShareLink = (userRole: USER_ROLE) => {
    return renewShareAppLink(userRole, appId)
  }

  const updateAppConfig = async (isPublic: boolean) => {
    const res = await updateAppPublicConfig(isPublic, appId)
    dispatch(
      dashboardAppActions.modifyConfigDashboardAppReducer({
        appId,
        config: { public: isPublic },
      }),
    )
    return res
  }

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

  useEffect(() => {
    renameVisible &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "rename_modal", parameter5: appId },
      )
  }, [renameVisible, appId])

  useEffect(() => {
    duplicateVisible &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "duplicate_modal", parameter5: appId },
      )
  }, [appId, duplicateVisible])

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
                onClick={() => {
                  setRenameVisible(true)
                }}
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
                onClick={() => {
                  setShareVisible(true)
                  track(
                    ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                    { element: "app_share", parameter5: appId },
                  )
                }}
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
                onClick={() => {
                  setDuplicateVisible(true)
                  track(
                    ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                    { element: "app_duplicate", parameter5: appId },
                  )
                }}
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
        <MemberListContext.Provider
          value={{
            isCloudVersion,
            currentTeamLicense:
              teamInfo?.currentTeamLicense ?? ({} as SubscribeInfo),
            totalTeamLicense:
              teamInfo?.totalTeamLicense ?? ({} as TotalTeamLicense),
          }}
        >
          <InviteModal
            hasApp
            teamName={isCloudVersion ? teamInfo?.name : "ILLA"}
            userNickname={currentUserInfo.nickname}
            isCloudVersion={isCloudVersion}
            appLink={`${window.location.origin}/${teamIdentifier}/deploy/app/${app.appId}`}
            isAppPublic={app?.config?.public}
            fetchInviteLink={fetchShareLink}
            renewInviteLink={renewShareLink}
            configInviteLink={setInviteLinkEnabled}
            allowInviteByLink={inviteLinkEnabled}
            allowEditorManageTeamMember={allowEditorManageTeamMember}
            allowViewerManageTeamMember={allowViewerManageTeamMember}
            userListData={members}
            currentUserRole={currentUserRole}
            inviteByEmail={handleInviteByEmail}
            changeTeamMembersRole={handleChangeTeamMembersRole}
            updateAppPublicConfig={updateAppConfig}
            visible={shareVisible}
            handleCloseModal={closeInviteModal}
            appID={app.appId}
          />
        </MemberListContext.Provider>
      </MixpanelTrackProvider>
      <RenameModal
        appId={app.appId}
        visible={renameVisible}
        onVisibleChange={(visible) => {
          setRenameVisible(visible)
        }}
      />
      <DuplicateModal
        appId={app.appId}
        visible={duplicateVisible}
        onVisibleChange={(visible) => {
          setDuplicateVisible(visible)
        }}
      />
    </div>
  )
}

AppCardActionItem.displayName = "AppCardActionItem"
