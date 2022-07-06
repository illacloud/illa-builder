import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { Unsubscribe } from "@reduxjs/toolkit"
import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"

async function handleUpdateExecution(
  action: ReturnType<typeof configActions.updateSelectedComponent>,
  listenerApi: AppListenerEffectAPI,
) {
  listenerApi.dispatch(componentsActions.bringToFrontReducer(action.payload))
}

async function handleDeleteExecution(
  action: ReturnType<typeof componentsActions.removeComponentReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  listenerApi.dispatch(
    displayNameActions.removeDisplayNameReducer(action.payload.displayName),
  )
}

export function setupComponentsListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: configActions.updateSelectedComponent,
      effect: handleUpdateExecution,
    }),
    startListening({
      actionCreator: componentsActions.removeComponentReducer,
      effect: handleDeleteExecution,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
