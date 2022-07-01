import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { Unsubscribe } from "@reduxjs/toolkit"
import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"

async function handleUpdateExecution(
  action: ReturnType<typeof configActions.updateSelectedComponent>,
  listenerApi: AppListenerEffectAPI,
) {
  listenerApi.dispatch(componentsActions.bringToFrontReducer(action.payload))
}

export function setupComponentsListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: configActions.updateSelectedComponent,
      effect: handleUpdateExecution,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
