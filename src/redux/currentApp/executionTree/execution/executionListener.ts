import { Unsubscribe } from "@reduxjs/toolkit"
import { getAllComponentDisplayNameMapProps } from "@/redux/currentApp/editor/components/componentsSelector"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { executionActions } from "@/redux/currentApp/executionTree/execution/executionSlice"
import { getEvalOrderSelector } from "@/redux/currentApp/executionTree/dependencies/dependenciesSelector"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { worker } from "@/redux/currentApp/executionTree/dependencies/dependenciesListener"
import { WidgetConfig } from "@/widgetLibrary/widgetBuilder"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getAllActionDisplayNameMapProps } from "@/redux/currentApp/action/actionSelector"

async function handleUpdateExecution(
  action: ReturnType<typeof dependenciesActions.setDependenciesReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const displayNameMapProps = getAllComponentDisplayNameMapProps(rootState)
  const displayNameMapActions = getAllActionDisplayNameMapProps(rootState)
  const builderInfo = getBuilderInfo(rootState)
  const currentUser = getCurrentUser(rootState)
  if (!displayNameMapProps) return
  const { order, point } = getEvalOrderSelector(rootState)
  const deepCloned = JSON.parse(JSON.stringify(WidgetConfig))
  worker.postMessage({
    action: "EXECUTION_TREE",
    displayNameMapProps,
    builderInfo,
    currentUser,
    evalOrder: order,
    point,
    WidgetConfig: deepCloned,
    displayNameMapActions,
  })
  worker.onmessage = (e) => {
    const { data } = e
    const { newEvaluatedTree = {}, newErrorTree = {} } = data
    listenerApi.dispatch(
      executionActions.setExecutionReducer({
        result: newEvaluatedTree,
        error: newErrorTree,
      }),
    )
  }
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
