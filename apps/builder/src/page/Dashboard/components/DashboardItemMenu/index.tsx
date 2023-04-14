import { FC, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  Button,
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  Space,
  useMessage,
  useModal,
} from "@illa-design/react"
import {
  fetchShareAppLink,
  renewShareAppLink,
  shareAppByEmail,
  updateAppPublicConfig,
} from "@/api/apps"
import { BuilderApi } from "@/api/base"
import {
  changeTeamMembersRole,
  inviteByEmail,
  setInviteLinkEnabled,
  updateMembers,
} from "@/api/team"
import { InviteModal } from "@/illa-public-component/MemberList/components/Header/InviteModal"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackProvider } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import {
  DashboardItemMenuProps,
  DeleteDashboardAppResponse,
} from "@/page/Dashboard/components/DashboardItemMenu/interface"
import { buttonVisibleStyle } from "@/page/Dashboard/components/DashboardResourceItemMenu/style"
import { DuplicateModal } from "@/page/Dashboard/components/DuplicateModal"
import { RenameModal } from "@/page/Dashboard/components/RenameModal"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { getCurrentTeamInfo, getMemberList } from "@/redux/team/teamSelector"
import { MemberInfo } from "@/redux/team/teamState"
import { RootState } from "@/store"
import { track, trackInDashboard } from "@/utils/mixpanelHelper"
import { eventReportCallback } from "@/utils/mixpanelHelper/eventReport2Public"
import { isCloudVersion } from "@/utils/typeHelper"

export const DashboardItemMenu: FC<DashboardItemMenuProps> = (props) => {
  const { appId, canEditApp, canManageApp, isDeploy } = props

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

  const [shareVisible, setShareVisible] = useState(false)
  const [renameVisible, setRenameVisible] = useState(false)
  const [duplicateVisible, setDuplicateVisible] = useState(false)

  const members = useSelector(getMemberList) ?? []
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
    return changeTeamMembersRole(teamMemberID, userRole).then((res) => {
      updateMembers()
      return res
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

  const eventReport = useMemo(() => eventReportCallback(appId), [appId])

  useEffect(() => {
    if (canEditApp || (isDeploy && canManageApp)) {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "app_more", parameter5: appId },
      )
    }
  }, [canEditApp, isDeploy, canManageApp, appId])

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
    <>
      <Space
        direction="horizontal"
        w="100%"
        justifyContent="end"
        size="4px"
        alignItems="center"
      >
        {isDeploy ? (
          <Button
            css={buttonVisibleStyle}
            className="dashboardAppLaunchButton"
            colorScheme="techPurple"
            onClick={() => {
              navigate(`/${teamIdentifier}/deploy/app/${app.appId}`)
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                { element: "app_launch", parameter5: appId },
              )
            }}
          >
            {t("launch")}
          </Button>
        ) : null}
        {canEditApp ? (
          <>
            <Button
              css={buttonVisibleStyle}
              className="dashboardAppEditButton"
              colorScheme="techPurple"
              onClick={() => {
                navigate(`/${teamIdentifier}/app/${app.appId}`)
                track(
                  ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                  ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                  { element: "app_edit", parameter5: appId },
                )
              }}
            >
              {t("edit")}
            </Button>
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
                    { element: "app_rename", parameter5: appId },
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
                    title={t("rename")}
                    onClick={() => {
                      setRenameVisible(true)
                      track(
                        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                        { element: "app_rename", parameter5: appId },
                      )
                    }}
                  />
                  {isDeploy && (
                    <DropListItem
                      key="share"
                      value="share"
                      title={t("share")}
                      onClick={() => {
                        setShareVisible(true)
                        track(
                          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                          { element: "app_share", parameter5: appId },
                        )
                      }}
                    />
                  )}
                  <DropListItem
                    key="duplicate"
                    value="duplicate"
                    title={t("duplicate")}
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
                    title={t("dashboard.common.delete")}
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
                          BuilderApi.teamRequest<DeleteDashboardAppResponse>(
                            {
                              url: `/apps/${appId}`,
                              method: "DELETE",
                            },
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
                            (failure) => {
                              message.success({
                                content: t("dashboard.app.trash_failure"),
                              })
                            },
                            (crash) => {
                              message.error({
                                content: t("network_error"),
                              })
                            },
                            (loading) => {
                              modal.update(modalId, {
                                okLoading: loading,
                              })
                            },
                          )
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
              <Button
                ml="4px"
                colorScheme="grayBlue"
                leftIcon={<MoreIcon size="14px" />}
              />
            </Dropdown>
          </>
        ) : isDeploy && canManageApp ? (
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
                  title={t("share")}
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
            <Button
              ml="4px"
              colorScheme="grayBlue"
              leftIcon={<MoreIcon size="14px" />}
            />
          </Dropdown>
        ) : null}
      </Space>
      <MixpanelTrackProvider
        basicTrack={trackInDashboard}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP}
      >
        <InviteModal
          hasApp
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
      </MixpanelTrackProvider>
      <RenameModal
        appId={app.appId}
        visible={renameVisible}
        onVisibleChange={(visible) => {
          setRenameVisible(visible)
          visible &&
            track(
              ILLA_MIXPANEL_EVENT_TYPE.SHOW,
              ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
              { element: "rename_modal", parameter5: appId },
            )
        }}
      />
      <DuplicateModal
        appId={app.appId}
        visible={duplicateVisible}
        onVisibleChange={(visible) => {
          setDuplicateVisible(visible)
          visible &&
            track(
              ILLA_MIXPANEL_EVENT_TYPE.SHOW,
              ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
              { element: "duplicate_modal", parameter5: appId },
            )
        }}
      />
    </>
  )
}

DashboardItemMenu.displayName = "DashboardItemMenu"
