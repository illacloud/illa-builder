import { Unsubscribe } from "@reduxjs/toolkit"
import { configActions } from "@/redux/config/configSlice"
import { handleUpdateSelectedComponentExecution } from "@/redux/currentApp/collaborators/collaboratorsHandlers"
import store, { AppListenerEffectAPI, AppStartListening } from "@/store"

async function handleChangeSelectedActionExecution(
  action: ReturnType<typeof configActions.changeSelectedAction>,
  _listenerApi: AppListenerEffectAPI,
) {
  store.dispatch(configActions.updateCachedAction(action.payload))
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
