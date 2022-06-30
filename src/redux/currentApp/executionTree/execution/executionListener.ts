import { Unsubscribe } from "@reduxjs/toolkit"
import _ from "lodash"
import { AppStartListening, AppListenerEffectAPI } from "@/store"
import { getAllComponentDisplayNameMapProps } from "@/redux/currentApp/editor/components/componentsSelector"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { executionActions } from "@/redux/currentApp/executionTree/execution/executionSlice"
import { getEvalOrderSelector } from "@/redux/currentApp/executionTree/dependencies/dependenciesSelector"
import {
  getDisplayNameAndAttrPath,
  isDynamicString,
} from "@/utils/evaluateDynamicString/utils"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { ExecutionState } from "@/redux/currentApp/executionTree/execution/executionState"

function executeAllTree(
  displayNameMap: Record<string, any>,
  evalOrder: string[],
  point: number,
) {
  const oldTree = _.cloneDeep(displayNameMap)
  const errorTree: ExecutionState["error"] = {}
  try {
    const evaluatedTree = evalOrder.reduce(
      (
        current: Record<string, any>,
        fullPath: string,
        currentIndex: number,
      ) => {
        const { displayName, attrPath } = getDisplayNameAndAttrPath(fullPath)
        const widgetOrAction = current[displayName]
        let widgetOrActionAttribute = _.get(current, fullPath)
        let evaluateValue
        if (point === currentIndex) {
          // TODO: @weichen widget default value
          widgetOrActionAttribute = "defaultValue"
        }
        const requiredEval = isDynamicString(widgetOrActionAttribute)
        if (requiredEval) {
          try {
            evaluateValue = evaluateDynamicString(
              attrPath,
              widgetOrActionAttribute,
              current,
            )
          } catch (e) {
            _.set(errorTree, fullPath, {
              error: true,
              errorMessage: (e as Error).message,
            })
            // TODO: @weichen widget default value
            evaluateValue = undefined
          }
        } else {
          evaluateValue = widgetOrActionAttribute
        }
        return _.set(current, fullPath, evaluateValue)
      },
      oldTree,
    )
    return { evaluatedTree, errorTree }
  } catch (e) {
    return { evaluatedTree: oldTree, errorTree }
  }
}

async function handleUpdateExecution(
  action: ReturnType<typeof dependenciesActions.setDependenciesReducer>,
  listenerApi: AppListenerEffectAPI,
) {
  const rootState = listenerApi.getState()
  const displayNameMapProps = getAllComponentDisplayNameMapProps(rootState)
  if (!displayNameMapProps) return
  const { order, point } = getEvalOrderSelector(rootState)
  const { evaluatedTree, errorTree } = executeAllTree(
    displayNameMapProps,
    order,
    point,
  )
  listenerApi.dispatch(
    executionActions.setExecutionReducer({
      result: evaluatedTree,
      error: errorTree,
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
