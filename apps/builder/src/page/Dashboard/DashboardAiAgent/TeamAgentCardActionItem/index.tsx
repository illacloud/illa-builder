import { UpgradeCloudContext } from "@illa-public/upgrade-cloud-provider"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { canUseUpgradeFeature } from "@illa-public/user-role-utils"
import { FC, MouseEvent, useCallback, useContext, useState } from "react"
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
import { dashboardTeamAiAgentActions } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSlice"
import { deleteAiAgent, duplicateAiAgent } from "@/services/agent"
import { isCloudVersion, isILLAAPiError } from "@/utils/typeHelper"


export interface AppCardActionItemProps {
  aiAgentID: string
  aiAgentName: string
  canEdit: boolean
  publishedToMarketplace: boolean
}

export const TeamAgentCardActionItem: FC<AppCardActionItemProps> = (props) => {
  const { aiAgentID, aiAgentName, canEdit, publishedToMarketplace } = props

  const { t } = useTranslation()
  const message = useMessage()
  const modal = useModal()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { teamIdentifier } = useParams()

  const teamInfo = useSelector(getCurrentTeamInfo)!

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

  const onContributed = useCallback(
    (value: boolean) => {
      dispatch(
        dashboardTeamAiAgentActions.modifyTeamAiAgentReducer({
          aiAgentID,
          modifiedProps: {
            publishedToMarketplace: value,
          },
        }),
      )
    },
    [dispatch, aiAgentID],
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
      ) : publishedToMarketplace ? (
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
      ) : null}
    </div>
  )
}

TeamAgentCardActionItem.displayName = "TeamAgentCardActionItem"