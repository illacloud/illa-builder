import { generateDependencies } from "@/utils/generators/generateDependenciesMap"
import {
  ExecutionErrorType,
  ExecutionState,
} from "@/redux/currentApp/executionTree/execution/executionState"
import { cloneDeep, get, set } from "lodash"
import { generateAllTypePathsFromWidgetConfig } from "@/utils/generators/generateAllTypePathsFromWidgetConfig"
import { validationFactory } from "@/utils/validationFactory"
import {
  getDisplayNameAndAttrPath,
  isDynamicString,
} from "@/utils/evaluateDynamicString/utils"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { WidgetConfigs } from "@/widgetLibrary/interface"

const context: Worker = self as any

function validateTree(
  evaluatedTree: Record<string, any>,
  errorTree: ExecutionState["error"],
  WidgetConfig: WidgetConfigs,
) {
  const newErrorTree: ExecutionState["error"] = cloneDeep(errorTree)
  const newEvaluatedTree = Object.keys(evaluatedTree).reduce(
    (current: Record<string, any>, displayName) => {
      const widgetOrAction = current[displayName]
      if (widgetOrAction.$type === "WIDGET") {
        const panelConfig = WidgetConfig[widgetOrAction.$widgetType].panelConfig
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

context.addEventListener("message", (event) => {
  const { action } = event.data
  switch (action) {
    case "GENERATE_DEPENDENCIES": {
      const { displayNameMapProps } = event.data
      const result = generateDependencies(displayNameMapProps)
      context.postMessage({
        result,
      })
      break
    }
    case "EXECUTION_TREE": {
      const {
        displayNameMapProps = {},
        evalOrder = [],
        point = -1,
        WidgetConfig = {},
      } = event.data
      const { evaluatedTree, errorTree } = executeAllTree(
        displayNameMapProps,
        evalOrder,
        point,
      )
      const { evaluatedTree: newEvaluatedTree, errorTree: newErrorTree } =
        validateTree(evaluatedTree, errorTree, WidgetConfig)
      context.postMessage({
        newEvaluatedTree,
        newErrorTree,
      })
    }
  }
})
