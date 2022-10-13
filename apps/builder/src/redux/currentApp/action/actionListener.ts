import { Unsubscribe } from "@reduxjs/toolkit"
import store, { AppListenerEffectAPI, AppStartListening } from "@/store"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { configActions } from "@/redux/config/configSlice"

async function handleRemoveActionItem(
  action: ReturnType<typeof actionActions.removeActionItemReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  store.dispatch(configActions.changeSelectedAction(null))
}

export function setupActionListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: actionActions.removeActionItemReducer,
      effect: handleRemoveActionItem,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
