import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"
import { getSelectedAction } from "@/redux/config/configSelector"

// Should not duplicate with actions's displayName
export const SELECTED_ACTION_DISPALY_NAME = "ILLA_REDUX_CONFIG_SELECTED_ACTION"

export const selectAllActionItem = (state: RootState) => state.currentApp.action

// include all action in action redux and selectedAction in config redux
export const getAllActionDisplayNameMapProps = createSelector(
  [selectAllActionItem, getSelectedAction],
  (actions, selectedAction) => {
    const res: Record<string, any> = {}

    if (!actions || actions.length === 0) {
      return res
    }

    actions.forEach(({ displayName, actionType, actionTemplate }) => {
      res[displayName] = {
        $type: "ACTION",
        $actionType: actionType,
        ...actionTemplate,
      }
    })

    if (res[SELECTED_ACTION_DISPALY_NAME]) {
      console.error("Selected action displayName is duplicate.")
    }

    res[SELECTED_ACTION_DISPALY_NAME] = {
      $type: "ACTION",
      $actionType: selectedAction.actionType,
      ...selectedAction.actionTemplate,
    }

    return res
  },
)
