import { ShareAppPC } from "@illa-public/invite-modal"
import {
  getCurrentTeamInfo,
  getCurrentUser,
  teamActions,
} from "@illa-public/user-data"
import {
  canManageInvite,
  canUseUpgradeFeature,
} from "@illa-public/user-role-utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, ContributeIcon, getColor } from "@illa-design/react"
import { ContributeButtonProps } from "@/page/App/components/PageNavBar/ContributeButton/interface"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { copyToClipboard } from "@/utils/copyToClipboard"

export const ContributeButton: FC<ContributeButtonProps> = (props) => {
  const { appInfo } = props

  const { t } = useTranslation()

  const currentUserInfo = useSelector(getCurrentUser)

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const dispatch = useDispatch()

  const [shareModalVisible, setShareModalVisible] = useState(false)

  const showInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  return (
    <>
      <Button
        colorScheme="grayBlue"
        onClick={() => {
          setShareModalVisible(true)
        }}
        leftIcon={<ContributeIcon c={getColor("grayBlue", "02")} />}
      >
        {t("contribute")}
      </Button>
      {shareModalVisible && (
        <ShareAppPC
          isDeployed={appInfo.deployed}
          title={t("user_management.modal.social_media.default_text.app", {
            appName: appInfo.appName,
          })}
          defaultTab={"public"}
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
            setShareModalVisible(false)
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
          defaultAppPublic={appInfo.config.public}
          defaultAppContribute={appInfo.config.publishedToMarketplace}
          appID={appInfo.appId}
          userRoleForThisApp={teamInfo.myRole}
          ownerTeamID={teamInfo.id}
          ownerTeamIdentify={teamInfo.identifier}
          onAppPublic={(isPublic) => {
            dispatch(appInfoActions.updateAppPublicReducer(isPublic))
          }}
          onAppContribute={(isContributed) => {
            dispatch(appInfoActions.updateAppContributeReducer(isContributed))
            if (isContributed) {
              dispatch(appInfoActions.updateAppDeployedReducer(true))
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
        />
      )}
    </>
  )
}

ContributeButton.displayName = "ContributeButton"
