import store, { AppListenerEffectAPI, AppStartListening } from "@/store"
import { Unsubscribe } from "@reduxjs/toolkit"
import { configActions } from "@/redux/config/configSlice"

async function handleUpdateSelectedActionExecution(
  action: ReturnType<typeof configActions.updateSelectedAction>,
  listenerApi: AppListenerEffectAPI,
) {
  const resource = store
    .getState()
    .resource.find((r) => r.resourceId === action.payload.resourceId)
  if (resource != null) {
    store.dispatch(
      configActions.updateCacheActionContent({
        resourceType: resource.resourceType,
        content: action.payload.content,
      }),
    )
  }
}

async function handleChangeSelectedActionExecution(
  action: ReturnType<typeof configActions.changeSelectedAction>,
  listenerApi: AppListenerEffectAPI,
) {
  store.dispatch(configActions.clearCacheActionContent())
}

export function setupConfigListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: configActions.updateSelectedAction,
      effect: handleUpdateSelectedActionExecution,
    }),
    startListening({
      actionCreator: configActions.changeSelectedAction,
      effect: handleChangeSelectedActionExecution,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
