import { AppStartListening, AppListenerEffectAPI } from "@/store"
import { Unsubscribe } from "@reduxjs/toolkit"
import { getAllComponentDisplayNameMapProps } from "@/redux/currentApp/editor/components/componentsSelector"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { executionActions } from "@/redux/currentApp/executionTree/execution/executionSlice"

async function handleUpdateExecution(
  action: ReturnType<typeof dependenciesActions.setDependenciesReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const displayNameMapProps = getAllComponentDisplayNameMapProps(rootState)
  const executionOrder = {
    order: ["TEXT_WIDGET1", "TEXT_WIDGET1.text"],
    point: -1,
  }
  if (!displayNameMapProps) return
  // TODO: @weichen wait to eval;
  // const inverseDependencies = generateDependencies(displayNameMapProps)
  listenerApi.dispatch(
    executionActions.setExecutionReducer({
      execution: displayNameMapProps,
    }),
  )
}

export function setupExecutionListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: dependenciesActions.setDependenciesReducer,
      effect: handleUpdateExecution,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
