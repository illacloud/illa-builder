import {UpgradeIcon} from "@illa-public/icon"
import InviteModal from "@illa-public/invite-modal"
import {INVITE_FROM} from "@illa-public/invite-modal/interface"
import {UpgradeCloudContext} from "@illa-public/upgrade-cloud-provider"
import {FC, useCallback, useContext, useState} from "react"
import {useTranslation} from "react-i18next"
import {Button, getColor} from "@illa-design/react"
import {ShareAppButtonProps} from "@/page/App/components/PageNavBar/ShareAppButton/interface"
import {isCloudVersion} from "@/utils/typeHelper"

export const ShareAppButton: FC<ShareAppButtonProps> = (props) => {
  const {t} = useTranslation()
  const {appInfo, canUseBillingFeature} = props

  const {handleUpgradeModalVisible} = useContext(UpgradeCloudContext)

  const [shareModalVisible, setShareModalVisible] = useState(false)

  const openInviteModal = useCallback(() => {
    if (isCloudVersion && !canUseBillingFeature) {
      handleUpgradeModalVisible(true, "upgrade")
      return
    }
    setShareModalVisible(true)
  }, [canUseBillingFeature, handleUpgradeModalVisible])

  return (
    <>
      <Button
        colorScheme="grayBlue"
        rightIcon={
          isCloudVersion &&
          !canUseBillingFeature && (
            <UpgradeIcon color={getColor("techPurple", "01")}/>
          )
        }
        onClick={openInviteModal}
      >
        {t("share")}
      </Button>
      {shareModalVisible && (
        <InviteModal
          from={INVITE_FROM.BUILDER_IDE}
          onClose={() => {
            setShareModalVisible(false)
          }}
        />
      )}
    </>
  )
}
