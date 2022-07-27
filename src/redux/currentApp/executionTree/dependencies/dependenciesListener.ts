import { AnyAction, isAnyOf, Unsubscribe } from "@reduxjs/toolkit"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getAllComponentDisplayNameMapProps } from "@/redux/currentApp/editor/components/componentsSelector"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import dependenciesTreeWorker from "@/utils/worker/exectionTreeWorker?worker"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getAllActionDisplayNameMapProps } from "@/redux/currentApp/action/actionSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"

export const worker = new dependenciesTreeWorker()

async function handleUpdateDependencies(
  action: AnyAction,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const displayNameMapProps = getAllComponentDisplayNameMapProps(rootState)
  const displayNameMapActions = getAllActionDisplayNameMapProps(rootState)
  const builderInfo = getBuilderInfo(rootState)
  const currentUser = getCurrentUser(rootState)
  if (!displayNameMapProps) return
  worker.postMessage({
    action: "GENERATE_DEPENDENCIES",
    displayNameMapProps: displayNameMapProps,
    builderInfo: builderInfo,
    currentUser: currentUser,
    displayNameMapActions,
  })
  worker.onmessage = (e) => {
    const { data } = e
    const { result = {} } = data
    listenerApi.dispatch(dependenciesActions.setDependenciesReducer(result))
  }
}

export function setupDependenciesListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      matcher: isAnyOf(
        componentsActions.addComponentReducer,
        componentsActions.updateComponentPropsReducer,
        componentsActions.deleteComponentNodeReducer,
        componentsActions.copyComponentNodeReducer,
        componentsActions.updateComponentDisplayNameReducer,
        configActions.updateSelectActionTemplate,
        actionActions.updateActionTemplateReducer,
        actionActions.addActionItemReducer,
      ),
      effect: handleUpdateDependencies,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
