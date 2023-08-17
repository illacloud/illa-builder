import { UpgradeIcon } from "@illa-public/icon"
import InviteModal from "@illa-public/invite-modal"
import { INVITE_FROM } from "@illa-public/invite-modal/interface"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
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
        <InviteModal
          teamID={teamInfo.id}
          currentUserRole={teamInfo.myRole}
          from={INVITE_FROM.BUILDER_IDE}
          onClose={() => {
            setShareModalVisible(false)
          }}
        />
      )}
    </>
  )
}
