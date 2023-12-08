import {
  ActionContent,
  ActionType,
  ILLA_DRIVE_ACTION_REQUEST_TYPE,
} from "@illa-public/public-types"
import {
  CollarModalType,
  handleCollaPurchaseError,
} from "@illa-public/upgrade-modal"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import store from "@/store"
import { isDriveActionContent } from "../typeHelper"

const getReportElementByProduction = (isProduction: boolean, el: string) => {
  let prefix = isProduction ? "deploy_" : "builder_editor_"
  return `${prefix}${el}`
}

export const runActionErrorForColla = (
  actionType: ActionType,
  actionContent: ActionContent,
  error: unknown,
) => {
  const rootState = store.getState()
  const isProductionMode = getIsILLAProductMode(rootState)
  if (actionType === "aiagent") {
    return handleCollaPurchaseError(
      error,
      CollarModalType.TOKEN,
      getReportElementByProduction(
        isProductionMode,
        "token_not_enough_resource",
      ),
    )
  }
  if (isDriveActionContent(actionType, actionContent)) {
    if (
      actionContent.operation ===
        ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_MULTIPLE ||
      actionContent.operation === ILLA_DRIVE_ACTION_REQUEST_TYPE.DOWNLOAD_ONE
    ) {
      return handleCollaPurchaseError(
        error,
        CollarModalType.TRAFFIC,
        getReportElementByProduction(
          isProductionMode,
          "traffic_not_enough_resource",
        ),
      )
    } else if (
      actionContent.operation === ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD ||
      actionContent.operation === ILLA_DRIVE_ACTION_REQUEST_TYPE.UPLOAD_MULTIPLE
    ) {
      return handleCollaPurchaseError(
        error,
        CollarModalType.STORAGE,
        getReportElementByProduction(
          isProductionMode,
          "storage_not_enough_resource",
        ),
      )
    }
  }
}
