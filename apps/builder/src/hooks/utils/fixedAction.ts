import { cloneDeep } from "lodash"
import { INIT_ACTION_ADVANCED_CONFIG } from "@/page/App/components/Actions/AdvancedPanel/constant"
import {
  ACTION_RUN_TIME,
  ActionContent,
  ActionItem,
} from "@/redux/currentApp/action/actionState"

export const fixedActionToNewAction = (
  actions?: ActionItem<ActionContent>[],
) => {
  return (
    actions?.map((action) => {
      if (action.actionType === "transformer") {
        return action
      }
      const advancedConfig = cloneDeep(INIT_ACTION_ADVANCED_CONFIG)
      if (action.triggerMode === "automate") {
        advancedConfig.runtime = ACTION_RUN_TIME.APP_LOADED
      }
      return {
        ...action,
        config: {
          public: !!action.config?.public,
          advancedConfig: action.config?.advancedConfig ?? advancedConfig,
        },
      }
    }) ?? []
  )
}
