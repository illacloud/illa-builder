import {
  INIT_ACTION_ADVANCED_CONFIG,
  INIT_ACTION_MOCK_CONFIG,
} from "@illa-public/public-configs"
import { ACTION_RUN_TIME, ActionContent } from "@illa-public/public-types"
import { ActionItem } from "@illa-public/public-types"
import { klona } from "klona/json"

export const fixedActionToNewAction = (
  actions?: ActionItem<ActionContent>[],
) => {
  return (
    actions?.map((action) => {
      if (action.actionType === "transformer") {
        return action
      }
      const advancedConfig = klona(INIT_ACTION_ADVANCED_CONFIG)
      if (action.triggerMode === "automate") {
        advancedConfig.runtime = ACTION_RUN_TIME.APP_LOADED
      }
      return {
        ...action,
        config: {
          ...action.config,
          public: !!action.config?.public,
          advancedConfig: action.config?.advancedConfig ?? advancedConfig,
          mockConfig: action.config?.mockConfig ?? INIT_ACTION_MOCK_CONFIG,
        },
      }
    }) ?? []
  )
}
