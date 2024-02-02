import { UnknownAction, Unsubscribe, isAnyOf } from "@reduxjs/toolkit"
import { configActions } from "@/redux/config/configSlice"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { searchParent } from "@/utils/componentNode/search"
import { updateCurrentAllComponentsAttachedUsers } from "../currentApp/collaborators/collaboratorsHandlers"
import { cursorActions } from "../currentApp/cursor/cursorSlice"
import { getWidgetExecutionResult } from "../currentApp/executionTree/executionSelector"
import { getClientWidgetLayoutInfo } from "../currentApp/layoutInfo/layoutInfoSelector"

export const handleUpdateSelectedComponentExecution = (
  action: ReturnType<typeof configActions.updateSelectedComponent>,
  listenerApi: AppListenerEffectAPI,
) => {
  const currentComponentsAttachedUsers =
    listenerApi.getState().currentApp.collaborators.components
  const widgetLayoutInfo = getClientWidgetLayoutInfo(listenerApi.getState())

  const needExpandDisplayName = action.payload
    .map((displayName) => {
      return searchParent(displayName, widgetLayoutInfo)
    })
    .flat()
  listenerApi.dispatch(
    configActions.addExpandedWidgetReducer(needExpandDisplayName),
  )
  updateCurrentAllComponentsAttachedUsers(
    action.payload,
    currentComponentsAttachedUsers,
  )
}

async function handleChangeSelectedActionExecution(
  action: ReturnType<typeof configActions.changeSelectedAction>,
  listenerApi: AppListenerEffectAPI,
) {
  listenerApi.dispatch(configActions.updateCachedAction(action.payload))
}

const getAllChildrenDisplayName = (
  nodeDisplayName: string,
  displayNameMapProps: Record<string, any>,
): string[] => {
  let result = [nodeDisplayName]
  const node = displayNameMapProps[nodeDisplayName]
  const children: string[] = node?.$childrenNode || []
  if (children.length > 0) {
    children.forEach((child) => {
      result = [
        ...result,
        ...getAllChildrenDisplayName(child, displayNameMapProps),
      ]
    })
  }
  return result
}

const batchUpdateComponentStatusInfoEffect = (
  action: UnknownAction,
  listenApi: AppListenerEffectAPI,
) => {
  if (
    configActions.setDraggingNodeIDsReducer.match(action) ||
    configActions.setResizingNodeIDsReducer.match(action)
  ) {
    const { payload } = action
    let allChildrenDisplayName: string[] = []
    const displayNameMapProps = getWidgetExecutionResult(listenApi.getState())
    payload.forEach((displayName) => {
      allChildrenDisplayName = [
        ...allChildrenDisplayName,
        ...getAllChildrenDisplayName(displayName, displayNameMapProps),
      ]
    })
    listenApi.dispatch(
      cursorActions.filterCursorReducer(allChildrenDisplayName),
    )
  }
}

export function setupConfigListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: configActions.changeSelectedAction,
      effect: handleChangeSelectedActionExecution,
    }),
    startListening({
      actionCreator: configActions.updateSelectedComponent,
      effect: handleUpdateSelectedComponentExecution,
    }),
    startListening({
      matcher: isAnyOf(
        configActions.setDraggingNodeIDsReducer,
        configActions.setResizingNodeIDsReducer,
      ),
      effect: batchUpdateComponentStatusInfoEffect,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
