import { Unsubscribe } from "@reduxjs/toolkit"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import store, { AppListenerEffectAPI, AppStartListening } from "@/store"

async function handleRemoveActionItem(
  action: ReturnType<typeof actionActions.removeActionItemReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  if (action.payload === store.getState().config.selectedAction?.displayName) {
    store.dispatch(configActions.changeSelectedAction(null))
  }
}

async function handleUpdateActionItem(
  action: ReturnType<typeof actionActions.updateActionItemReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  if (
    action.payload.actionId === store.getState().config.selectedAction?.actionId
  ) {
    store.dispatch(configActions.changeSelectedAction(action.payload))
  }
}

export function setupActionListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: actionActions.removeActionItemReducer,
      effect: handleRemoveActionItem,
    }),
    startListening({
      actionCreator: actionActions.updateActionItemReducer,
      effect: handleUpdateActionItem,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
