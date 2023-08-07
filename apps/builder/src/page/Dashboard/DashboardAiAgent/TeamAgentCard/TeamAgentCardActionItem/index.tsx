import { FC, MouseEvent, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
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
import { ERROR_FLAG } from "@/api/errorFlag"
import { REDIRECT_PAGE_TYPE } from "@/illa-public-component/MemberList/interface"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import { canUseUpgradeFeature } from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import TeamAgentShareModal from "@/illa-public-market-component/TeamAgentShareModal"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import {
  getCurrentMemberList,
  getCurrentTeamInfo,
} from "@/redux/team/teamSelector"
import {
  deleteAiAgent,
  duplicateAiAgent,
  fetchShareAgentLink,
  shareAgentByEmail,
} from "@/services/agent"
import {
  changeTeamMembersRole,
  updateMembers,
  updateTeamsInfo,
} from "@/services/team"
import { isCloudVersion, isILLAAPiError } from "@/utils/typeHelper"

export interface AppCardActionItemProps {
  aiAgentID: string
  aiAgentName: string
  canEdit: boolean
}

export const TeamAgentCardActionItem: FC<AppCardActionItemProps> = (props) => {
  const { aiAgentID, aiAgentName, canEdit } = props

  const { t } = useTranslation()
  const message = useMessage()
  const modal = useModal()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()

  const userInfo = useSelector(getCurrentUser)
  const teamInfo = useSelector(getCurrentTeamInfo)!
  const members = useSelector(getCurrentMemberList) ?? []
  const agentLink = `${location.protocol}//${location.host}/${aiAgentID}/detail`

  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [shareVisible, setShareVisible] = useState(false)
  const [duplicateLoading, setDuplicateLoading] = useState(false)

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const closeInviteModal = () => {
    setShareVisible(false)
  }

  const openInviteModal = useCallback(() => {
    if (isCloudVersion && !canUseBillingFeature) {
      handleUpgradeModalVisible(true, "upgrade")
      return
    }
    setShareVisible(true)
  }, [canUseBillingFeature, handleUpgradeModalVisible])

  const handleDuplicateApp = () => {
    if (duplicateLoading) return
    setDuplicateLoading(true)
    duplicateAiAgent(aiAgentID)
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

  const handleDelete = useCallback(() => {
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
        deleteAiAgent(aiAgentID)
          .then(
            () => {
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
  }, [aiAgentID, modal, message, t])

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

  return (
    <div onClick={stopPropagation}>
      {canEdit ? (
        <Dropdown
          position="bottom-end"
          trigger="click"
          triggerProps={{ closeDelay: 0, openDelay: 0 }}
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
      )}
      <TeamAgentShareModal
        visible={shareVisible}
        onCancel={closeInviteModal}
        agentName={aiAgentName}
        agentLink={agentLink}
        currentUserRole={teamInfo?.myRole}
        teamName={teamInfo?.name}
        userNickname={userInfo.nickname}
        userListData={members}
        fetchInviteLink={fetchShareLink}
        inviteByEmail={handleInviteByEmail}
        changeTeamMembersRole={handleChangeTeamMembersRole}
      />
    </div>
  )
}

TeamAgentCardActionItem.displayName = "TeamAgentCardActionItem"
