import { createUpgradeModal } from "@illa-public/upgrade-modal"
import { isSubscribeForUseDrive } from "@illa-public/upgrade-modal/utils"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import store from "@/store"

export const isNeedPreventForPremium = (): boolean => {
  const isProductionMode = getIsILLAProductMode(store.getState())
  if (isProductionMode) {
    return false
  }
  if (isCloudVersion) {
    const teamInfo = getCurrentTeamInfo(store.getState())!
    const upgradeModal = createUpgradeModal()
    if (!isSubscribeForUseDrive(teamInfo)) {
      upgradeModal({
        modalType: "upgrade",
        from: "drive_run_event_handler",
      })
      return true
    }
  }
  return false
}
