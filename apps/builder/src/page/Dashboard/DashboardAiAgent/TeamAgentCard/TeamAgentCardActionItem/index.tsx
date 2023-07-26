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
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import {
  canManageApp,
  canUseUpgradeFeature,
} from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { duplicateApp } from "@/page/Dashboard/DashboardApps/AppCardActionItem/utils"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { fetchDeleteApp } from "@/services/apps"
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()

  const teamInfo = useSelector(getCurrentTeamInfo)
  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [shareVisible, setShareVisible] = useState(false)
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

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const closeInviteModal = () => {
    setShareVisible(false)
  }
  console.log(canSetPublic, shareVisible, closeInviteModal)

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
    duplicateApp(aiAgentID, aiAgentName)
      .then(
        (response) => {
          dispatch(
            dashboardAppActions.addDashboardAppReducer({
              app: response.data,
            }),
          )
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
        fetchDeleteApp(aiAgentID)
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
    })
  }, [aiAgentID, dispatch, modal, message, t])

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
    </div>
  )
}

TeamAgentCardActionItem.displayName = "TeamAgentCardActionItem"
