import { FC, useCallback, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, getColor } from "@illa-design/react"
import { UpgradeIcon } from "@/illa-public-component/Icon/upgrade"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import { AppInviteModal } from "@/page/Dashboard/DashboardApps/AppInviteModal"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { isCloudVersion } from "@/utils/typeHelper"

export interface ShareAppButtonProps {
  canUseBillingFeature: boolean
  appInfo: DashboardApp
}

export const ShareAppButton: FC<ShareAppButtonProps> = (props) => {
  const { t } = useTranslation()
  const { appInfo, canUseBillingFeature } = props

  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [shareModalVisible, setShareModalVisible] = useState(false)

  const closeInviteModal = useCallback(() => {
    setShareModalVisible(false)
  }, [])

  const openInviteModal = useCallback(() => {
    if (isCloudVersion && !canUseBillingFeature) {
      handleUpgradeModalVisible(true, "upgrade")
      return
    }
    setShareModalVisible(true)
  }, [canUseBillingFeature, handleUpgradeModalVisible])

  return (
    <div>
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

      <AppInviteModal
        appInfo={appInfo}
        visible={shareModalVisible}
        handleCloseModal={closeInviteModal}
        inviteToUseAppStatus={"hidden"}
      />
    </div>
  )
}
