import { ShareAgentPC } from "@illa-public/invite-modal"
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
  getPlanUtils,
  teamActions,
} from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
  canManageInvite,
  canUseUpgradeFeature,
  openShareAgentModal,
  showShareAgentModal,
} from "@illa-public/user-role-utils"
import { FC, MouseEvent, useCallback, useState } from "react"
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
  useMessage,
  useModal,
} from "@illa-design/react"
import { TeamAgentCardActionItemProps } from "@/page/Dashboard/DashboardAIAgent/TeamAgentCardActionItem/interface"
import { dashboardTeamAIAgentActions } from "@/redux/dashboard/teamAIAgents/dashboardTeamAIAgentSlice"
import { deleteAIAgent, duplicateAIAgent } from "@/services/agent"
import { copyToClipboard } from "@/utils/eventHandlerHelper/utils/commonUtils"
import { track } from "@/utils/mixpanelHelper"
import { isILLAAPiError } from "@/utils/typeHelper"

export const TeamAgentCardActionItem: FC<TeamAgentCardActionItemProps> = (
  props,
) => {
  const { aiAgentID, aiAgentName, publishedToMarketplace } = props

  const currentUser = useSelector(getCurrentUser)

  const { t } = useTranslation()
  const message = useMessage()
  const modal = useModal()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { teamIdentifier } = useParams()

  const teamInfo = useSelector(getCurrentTeamInfo)!

  const canEdit = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.AI_AGENT,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.CREATE_AI_AGENT,
  )

  const canInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo.permission.allowEditorManageTeamMember,
    teamInfo.permission.allowViewerManageTeamMember,
  )

  const upgradeModal = useUpgradeModal()
  const [shareVisible, setShareVisible] = useState(false)
  const [duplicateLoading, setDuplicateLoading] = useState(false)

  const openInviteModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
        {
          element: "card_more_share",
          parameter5: aiAgentID,
        },
      )
      e.stopPropagation()
      if (
        !openShareAgentModal(teamInfo, teamInfo.myRole, publishedToMarketplace)
      ) {
        upgradeModal({
          modalType: "upgrade",
        })
        return
      }
      setShareVisible(true)
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
        {
          element: "share_modal",
          parameter5: aiAgentID,
        },
      )
    },
    [aiAgentID, publishedToMarketplace, teamInfo, upgradeModal],
  )

  const handleDuplicateApp = (e: MouseEvent<HTMLDivElement>) => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
      {
        element: "card_more_duplicate",
        parameter5: aiAgentID,
      },
    )
    e.stopPropagation()
    if (duplicateLoading) return
    setDuplicateLoading(true)
    duplicateAIAgent(aiAgentID)
      .then(
        (response) => {
          const aiAgentID = response.data.aiAgentID
          navigate(`/${teamIdentifier}/ai-agent/${aiAgentID}`)
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

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
        {
          element: "card_more_delete",
          parameter5: aiAgentID,
        },
      )
      e.stopPropagation()
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
          modal.update(modalId, {
            okLoading: true,
          })
          deleteAIAgent(aiAgentID)
            .then(
              () => {
                dispatch(
                  dashboardTeamAIAgentActions.removeTeamAIAgentReducer(
                    aiAgentID,
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
      })
    },
    [modal, t, aiAgentID, dispatch, message],
  )

  const onContributed = useCallback(
    (value: boolean) => {
      dispatch(
        dashboardTeamAIAgentActions.modifyTeamAIAgentReducer({
          aiAgentID,
          modifiedProps: {
            publishedToMarketplace: value,
          },
        }),
      )
    },
    [dispatch, aiAgentID],
  )

  const handleClickMore = (e: MouseEvent<HTMLDivElement>) => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
      {
        element: "card_more",
        parameter5: aiAgentID,
      },
    )
    e.stopPropagation()
  }

  return (
    <div onClick={handleClickMore}>
      {canEdit ? (
        <Dropdown
          position="bottom-end"
          trigger="click"
          dropList={
            <DropList w="184px">
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
              {showShareAgentModal(
                teamInfo,
                teamInfo.myRole,
                publishedToMarketplace,
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
                  onClick={openInviteModal}
                />
              )}
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
                onClick={handleDelete}
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
        showShareAgentModal(
          teamInfo,
          teamInfo.myRole,
          publishedToMarketplace,
        ) && (
          // for viewer
          <Dropdown
            position="bottom-end"
            trigger="click"
            triggerProps={{ closeDelay: 0, openDelay: 0 }}
            dropList={
              <DropList w="184px">
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
        )
      )}
      <MixpanelTrackProvider
        basicTrack={track}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD}
      >
        {shareVisible && (
          <ShareAgentPC
            canUseBillingFeature={canUseUpgradeFeature(
              teamInfo.myRole,
              getPlanUtils(teamInfo),
              teamInfo.totalTeamLicense?.teamLicensePurchased,
              teamInfo.totalTeamLicense?.teamLicenseAllPaid,
            )}
            title={t("user_management.modal.social_media.default_text.agent", {
              agentName: aiAgentName,
            })}
            redirectURL={`${import.meta.env.ILLA_BUILDER_URL}/${
              teamInfo.identifier
            }/ai-agent/${aiAgentID}/run?myTeamIdentifier=${
              teamInfo.identifier
            }`}
            onClose={() => {
              setShareVisible(false)
            }}
            canInvite={canInvite}
            defaultInviteUserRole={USER_ROLE.VIEWER}
            teamID={teamInfo.id}
            currentUserRole={teamInfo.myRole}
            defaultBalance={teamInfo.currentTeamLicense.balance}
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
            agentID={aiAgentID}
            defaultAgentContributed={publishedToMarketplace}
            onAgentContributed={(isAgentContributed) => {
              onContributed(isAgentContributed)
            }}
            onCopyInviteLink={(link) => {
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
                {
                  element: "share_modal_copy_team",
                  parameter5: aiAgentID,
                },
              )
              copyToClipboard(
                t("user_management.modal.custom_copy_text_agent_invite", {
                  userName: currentUser.nickname,
                  teamName: teamInfo.name,
                  inviteLink: link,
                }),
              )
            }}
            onCopyAgentMarketLink={(link) => {
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
                {
                  element: "share_modal_link",
                  parameter5: aiAgentID,
                },
              )
              copyToClipboard(
                t("user_management.modal.contribute.default_text.agent", {
                  agentName: aiAgentName,
                  agentLink: link,
                }),
              )
            }}
            userRoleForThisAgent={teamInfo.myRole}
            ownerTeamID={teamInfo.id}
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
            onShare={(platform) => {
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
                {
                  element: "share_modal_social_media",
                  parameter4: platform,
                  parameter5: aiAgentID,
                },
              )
            }}
            teamPlan={getPlanUtils(teamInfo)}
          />
        )}
      </MixpanelTrackProvider>
    </div>
  )
}

TeamAgentCardActionItem.displayName = "TeamAgentCardActionItem"
