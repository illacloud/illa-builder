import store, { AppListenerEffectAPI, AppStartListening } from "@/store"
import { Unsubscribe } from "@reduxjs/toolkit"
import { configActions } from "@/redux/config/configSlice"

async function handleChangeSelectedActionExecution(
  action: ReturnType<typeof configActions.changeSelectedAction>,
  listenerApi: AppListenerEffectAPI,
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
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
