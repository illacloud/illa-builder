import { ActionType } from "@illa-public/public-types"
import { createUpgradeModal } from "@illa-public/upgrade-modal"
import { isSubscribeForUseDrive } from "@illa-public/upgrade-modal/utils"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import store from "@/store"

export const PREMIUM_ACTIONS = ["illadrive"]

export const isNeedPreventForPremium = (actionType: ActionType): boolean => {
  const isProductionMode = getIsILLAProductMode(store.getState())
  if (isProductionMode) {
    return false
  }
  if (isCloudVersion && PREMIUM_ACTIONS.includes(actionType)) {
    const teamInfo = getCurrentTeamInfo(store.getState())!
    const upgradeModal = createUpgradeModal()
    if (!isSubscribeForUseDrive(teamInfo)) {
      upgradeModal({
        modalType: "upgrade",
        from: "drive_run_action",
      })
      return true
    }
  }
  return false
}
