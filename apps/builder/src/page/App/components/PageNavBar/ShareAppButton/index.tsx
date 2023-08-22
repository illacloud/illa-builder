import { UpgradeIcon } from "@illa-public/icon"
import { ShareAppPC } from "@illa-public/invite-modal/ShareApp/pc"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo, teamActions } from "@illa-public/user-data"
import { canManageInvite } from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, getColor } from "@illa-design/react"
import { ShareAppButtonProps } from "@/page/App/components/PageNavBar/ShareAppButton/interface"


export const ShareAppButton: FC<ShareAppButtonProps> = (props) => {
  const { t } = useTranslation()
  const { appInfo, canUseBillingFeature } = props

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const upgradeModal = useUpgradeModal()
  const [shareModalVisible, setShareModalVisible] = useState(false)

  const openInviteModal = useCallback(() => {
    if (isCloudVersion && !canUseBillingFeature) {
      upgradeModal({ modalType: "upgrade" })
      return
    }
    setShareModalVisible(true)
  }, [canUseBillingFeature, upgradeModal])

  const dispatch = useDispatch()

  const showInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  return (
    <>
      <Button
        colorScheme="grayBlue"
        rightIcon={
          isCloudVersion &&
          !canUseBillingFeature && (
            <UpgradeIcon color={getColor("techPurple", "01")} />
          )
        }
        onClick={openInviteModal}
      >
        {t("share")}
      </Button>
      {shareModalVisible && (
        <ShareAppPC
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
          isDeployed={appInfo.mainlineVersion !== 0}
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
          defaultAppContribute={false}
          appID={appInfo.appId}
          userRoleForThisApp={teamInfo.myRole}
          ownerTeamID={teamInfo.id}
          ownerTeamIdentify={teamInfo.identifier}
          onAppPublic={(isPublic) => {}}
          onAppContribute={(isContributed) => {}}
          onCopyPublicLink={() => {}}
          onCopyContributeLink={() => {}}
          onCopyInviteLink={() => {}}
        />
      )}
    </>
  )
}