import { Unsubscribe } from "@reduxjs/toolkit"
import { cloneDeep, get, set } from "lodash"
import { getAllComponentDisplayNameMapProps } from "@/redux/currentApp/editor/components/componentsSelector"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { executionActions } from "@/redux/currentApp/executionTree/execution/executionSlice"
import { getEvalOrderSelector } from "@/redux/currentApp/executionTree/dependencies/dependenciesSelector"
import {
  getDisplayNameAndAttrPath,
  isDynamicString,
} from "@/utils/evaluateDynamicString/utils"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import {
  ExecutionState,
  ExecutionErrorType,
} from "@/redux/currentApp/executionTree/execution/executionState"
import { AppListenerEffectAPI, AppStartListening } from "@/store"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { generateAllTypePathsFromWidgetConfig } from "@/utils/generators/generateAllTypePathsFromWidgetConfig"
import { validationFactory } from "@/utils/validationFactory"

function validateTree(
  evaluatedTree: Record<string, any>,
  errorTree: ExecutionState["error"],
) {
  const newErrorTree: ExecutionState["error"] = cloneDeep(errorTree)
  const newEvaluatedTree = Object.keys(evaluatedTree).reduce(
    (current: Record<string, any>, displayName) => {
      const widgetOrAction = current[displayName]
      if (widgetOrAction.$type === "WIDGET") {
        const panelConfig = widgetBuilder(
          widgetOrAction.$widgetType,
        ).panelConfig
        const { validationPaths } = generateAllTypePathsFromWidgetConfig(
          panelConfig,
          widgetOrAction,
        )
        Object.keys(validationPaths).forEach((validationPath) => {
          const validationType = validationPaths[validationPath]
          const fullPath = `${displayName}.${validationPath}`
          const validationFunc = validationFactory[validationType]
          const value = get(widgetOrAction, validationPath)
          const { isValid, safeValue, errorMessage } = validationFunc(value)
          set(current, fullPath, safeValue)
          if (!isValid) {
            let error = get(errorTree, fullPath)
            if (!Array.isArray(error)) {
              error = []
            }
            error.push({
              errorType: ExecutionErrorType.VALIDATION,
              errorMessage: errorMessage as string,
            })
            set(newErrorTree, fullPath, error)
          }
        })
      }
      return current
    },
    evaluatedTree,
  )
  return {
    evaluatedTree: newEvaluatedTree,
    errorTree: newErrorTree,
  }
}

function executeAllTree(
  displayNameMap: Record<string, any>,
  evalOrder: string[],
  point: number,
) {
  const oldTree = cloneDeep(displayNameMap)
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
        let widgetOrActionAttribute = get(current, fullPath)
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
            let oldError = get(errorTree, fullPath)
            if (Array.isArray(oldError)) {
              oldError.push({
                errorType: ExecutionErrorType.EVALUATED,
                errorMessage: (e as Error).message,
              })
            }

            set(errorTree, fullPath, [
              {
                errorType: ExecutionErrorType.EVALUATED,
                errorMessage: (e as Error).message,
              },
            ])
            // TODO: @weichen widget default value
            evaluateValue = undefined
          }
        } else {
          evaluateValue = widgetOrActionAttribute
        }
        return set(current, fullPath, evaluateValue)
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
  const { evaluatedTree: newEvaluatedTree, errorTree: newErrorTree } =
    validateTree(evaluatedTree, errorTree)
  listenerApi.dispatch(
    executionActions.setExecutionReducer({
      result: newEvaluatedTree,
      error: newErrorTree,
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
