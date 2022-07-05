import { Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getAllComponentDisplayNameMapProps } from "@/redux/currentApp/editor/components/componentsSelector"
import { generateDependencies } from "@/utils/generators/generateDependenciesMap"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"

async function handleUpdateDependencies(
  action: unknown,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const displayNameMapProps = getAllComponentDisplayNameMapProps(rootState)
  if (!displayNameMapProps) return
  const inverseDependencies = generateDependencies(displayNameMapProps)
  listenerApi.dispatch(
    dependenciesActions.setDependenciesReducer(inverseDependencies),
  )
}

export function setupDependenciesListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      matcher: isAnyOf(
        componentsActions.updateComponentPropsReducer,
        componentsActions.deleteComponentNodeReducer,
      ),
      effect: handleUpdateDependencies,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
