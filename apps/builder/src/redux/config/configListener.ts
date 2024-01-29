import { Unsubscribe } from "@reduxjs/toolkit"
import { configActions } from "@/redux/config/configSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { searchParent } from "@/utils/componentNode/search"
import { updateCurrentAllComponentsAttachedUsers } from "../currentApp/collaborators/collaboratorsHandlers"
import { getExecutionWidgetLayoutInfo } from "../currentApp/executionTree/executionSelector"

export const handleUpdateSelectedComponentExecution = (
  action: ReturnType<typeof configActions.updateSelectedComponent>,
  listenerApi: AppListenerEffectAPI,
) => {
  const currentComponentsAttachedUsers =
    listenerApi.getState().currentApp.collaborators.components
  const widgetLayoutInfo = getExecutionWidgetLayoutInfo(listenerApi.getState())

  const needExpandDisplayName = action.payload
    .map((displayName) => {
      return searchParent(displayName, widgetLayoutInfo)
    })
    .flat()
  listenerApi.dispatch(
    configActions.addExpandedWidgetReducer(needExpandDisplayName),
  )
  updateCurrentAllComponentsAttachedUsers(
    action.payload,
    currentComponentsAttachedUsers,
  )
}

async function handleChangeSelectedActionExecution(
  action: ReturnType<typeof configActions.changeSelectedAction>,
  listenerApi: AppListenerEffectAPI,
) {
  listenerApi.dispatch(configActions.updateCachedAction(action.payload))
}

export function setupConfigListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: configActions.changeSelectedAction,
      effect: handleChangeSelectedActionExecution,
    }),
    startListening({
      actionCreator: configActions.updateSelectedComponent,
      effect: handleUpdateSelectedComponentExecution,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
