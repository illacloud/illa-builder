import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { Unsubscribe } from "@reduxjs/toolkit"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { getReflowResult } from "@/page/App/components/DotPanel/calc"
import { ComponentNode } from "./componentsState"

async function handleDeleteExecution(
  action: ReturnType<typeof componentsActions.deleteComponentNodeReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  DisplayNameGenerator.removeDisplayNameMulti(action.payload.displayNames)
}

function handleCopyComponentReflowEffect(
  action: ReturnType<typeof componentsActions.addComponentReducer>,
  listenApi: AppListenerEffectAPI,
) {
  const rootState = listenApi.getState()
  const rootNode = getCanvas(rootState)
  const componentNodes = action.payload
  const effectResultMap = new Map<string, ComponentNode>()
  componentNodes.forEach((node) => {
    const parentNodeDisplayName = node.parentNode
    let parentNode = searchDsl(rootNode, parentNodeDisplayName)
    if (!parentNode) {
      return
    }
    if (effectResultMap.has(parentNode.displayName)) {
      parentNode = effectResultMap.get(parentNode.displayName) as ComponentNode
    }
    const childrenNodes = parentNode.childrenNode
    const { finalState } = getReflowResult(node, childrenNodes, false)
    effectResultMap.set(parentNode.displayName, {
      ...parentNode,
      childrenNode: finalState,
    })
  })
  effectResultMap.forEach((value, key) => {
    listenApi.dispatch(
      componentsActions.updateComponentReflowReducer({
        parentDisplayName: key,
        childNodes: value.childrenNode,
      }),
    )
  })
}

export function setupComponentsListeners(
  startListening: AppStartListening,
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: componentsActions.deleteComponentNodeReducer,
      effect: handleDeleteExecution,
    }),
    startListening({
      actionCreator: componentsActions.addComponentReducer,
      effect: handleCopyComponentReflowEffect,
    }),
  ]

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
}
