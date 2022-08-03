import { RawTreeShape } from "@/utils/executionTreeHelper/interface"
import { cloneDeep, flatten, get, set } from "lodash"
import {
  getAllPaths,
  getDisplayNameAndAttrPath,
  getWidgetOrActionDynamicAttrPaths,
  isDynamicString,
} from "@/utils/evaluateDynamicString/utils"
import { getSnippets } from "@/utils/evaluateDynamicString/dynamicConverter"
import toposort from "toposort"
import {
  DependenciesState,
  ExecutionErrorType,
  ExecutionState,
} from "@/redux/currentApp/executionTree/executionState"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { extractReferencesFromScript } from "@/utils/executionTreeHelper/utils"

export class ExecutionTreeFactory {
  dependenciesState: DependenciesState = {}
  inDependencyTree: DependenciesState = {}
  evalOrder: string[] = []
  oldRawTree: RawTreeShape = {} as RawTreeShape
  hasCyclical: boolean = false
  executedTree: Record<string, any> = {}
  errorTree: Record<string, any> = {}
  allKeys: Record<string, true> = {}

  constructor() {}

  initTree(rawTree: RawTreeShape) {
    const currentRawTree = cloneDeep(rawTree)
    this.oldRawTree = cloneDeep(currentRawTree)

    this.dependenciesState = this.generateDependenciesMap(currentRawTree)
    this.evalOrder = this.sortEvalOrder(this.dependenciesState)
    this.inDependencyTree = this.generateInDependenciesMap()

    const { evaluatedTree, errorTree } = this.executeTree(
      currentRawTree,
      this.evalOrder,
    )
    // TODO: @aruseito need validate
    // const { evaluatedTree: newEvaluatedTree, errorTree: newErrorTree } =
    //   validateTree(evaluatedTree, errorTree, {})

    this.executedTree = evaluatedTree
    this.errorTree = errorTree
    return {
      dependencyTree: this.dependenciesState,
      evaluatedTree: evaluatedTree,
      errorTree: errorTree,
    }
  }

  // export function validateTree(
  //   evaluatedTree: Record<string, any>,
  //   errorTree: ExecutionState["error"],
  //   WidgetConfig: WidgetConfigs,
  // ) {
  //   const newErrorTree: ExecutionState["error"] = cloneDeep(errorTree)
  //   const newEvaluatedTree = Object.keys(evaluatedTree).reduce(
  //     (current: Record<string, any>, displayName) => {
  //       const widgetOrAction = current[displayName]
  //       if (widgetOrAction.$type === "WIDGET") {
  //         const panelConfig = WidgetConfig[widgetOrAction.$widgetType].panelConfig
  //         const { validationPaths } = generateAllTypePathsFromWidgetConfig(
  //           panelConfig,
  //           widgetOrAction,
  //         )
  //         Object.keys(validationPaths).forEach((validationPath) => {
  //           const validationType = validationPaths[validationPath]
  //           const fullPath = `${displayName}.${validationPath}`
  //           const validationFunc = validationFactory[validationType]
  //           const value = get(widgetOrAction, validationPath)
  //           const { isValid, safeValue, errorMessage } = validationFunc(value)
  //           set(current, fullPath, safeValue)
  //           if (!isValid) {
  //             let error = get(errorTree, fullPath)
  //             if (!Array.isArray(error)) {
  //               error = []
  //             }
  //             error.push({
  //               errorType: ExecutionErrorType.VALIDATION,
  //               errorMessage: errorMessage as string,
  //             })
  //             set(newErrorTree, fullPath, error)
  //           }
  //         })
  //       }
  //       return current
  //     },
  //     evaluatedTree,
  //   )
  //   return {
  //     evaluatedTree: newEvaluatedTree,
  //     errorTree: newErrorTree,
  //   }
  // }

  generateDependenciesMap(rawTree: RawTreeShape) {
    let dependenciesMap: DependenciesState = {}
    const allKeys = getAllPaths(rawTree)
    Object.keys(rawTree).forEach((displayName) => {
      const widgetProps = rawTree[displayName]
      const dynamicAttrPaths: string[] =
        getWidgetOrActionDynamicAttrPaths(widgetProps)
      if (dynamicAttrPaths.length) {
        dynamicAttrPaths.forEach((attrPath) => {
          const originValue = get(widgetProps, attrPath)
          const { jsSnippets } = getSnippets(originValue)
          const existingDeps =
            dependenciesMap[`${displayName}.${attrPath}`] || []
          dependenciesMap[`${displayName}.${attrPath}`] = existingDeps.concat(
            jsSnippets.filter((jsSnippet) => !!jsSnippet),
          )
        })
      }
    })

    Object.keys(dependenciesMap).forEach((key) => {
      dependenciesMap[key] = flatten(
        dependenciesMap[key].map((script) => {
          try {
            return extractReferencesFromScript(script, allKeys)
          } catch (e) {
            return []
          }
        }),
      )
    })

    return dependenciesMap
  }

  sortEvalOrder(dependenciesMap: DependenciesState): string[] {
    const dependencyTree: Array<[string, string]> = []
    Object.keys(dependenciesMap).forEach((key: string) => {
      if (dependenciesMap[key].length) {
        dependenciesMap[key].forEach((dep) => dependencyTree.push([key, dep]))
      } else {
        dependencyTree.push([key, ""])
      }
    })

    try {
      return toposort(dependencyTree)
        .reverse()
        .filter((d) => !!d)
    } catch (e) {
      this.hasCyclical = true
      if (e instanceof Error) {
        console.log("e.message", e.message)
        const nodes = e.message.match(
          new RegExp('Cyclic dependency, node was:"(.*)"'),
        )
        if (nodes) {
          const node = nodes[1]
          const entityName = node.split(".")[0]
          console.log("entityName", entityName)
        }
      }
      throw new Error("Cyclic dependency")
    }
  }

  generateInDependenciesMap(): DependenciesState {
    const inverseDag: DependenciesState = {}
    this.evalOrder.forEach((propertyPath) => {
      const incomingEdges: Array<string> = this.dependenciesState[propertyPath]
      if (incomingEdges) {
        incomingEdges.forEach((edge) => {
          const node = inverseDag[edge]
          if (node) {
            node.push(propertyPath)
          } else {
            inverseDag[edge] = [propertyPath]
          }
        })
      }
    })
    return inverseDag
  }

  executeTree(
    oldRawTree: RawTreeShape,
    sortedEvalOrder: string[],
    point: number = -1,
  ) {
    const oldLocalRawTree = cloneDeep(oldRawTree)
    const errorTree: ExecutionState["error"] = {}
    try {
      const evaluatedTree = sortedEvalOrder.reduce(
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
              evaluateValue = undefined
            }
          } else {
            evaluateValue = widgetOrActionAttribute
          }
          return set(current, fullPath, evaluateValue)
        },
        oldLocalRawTree,
      )
      return { evaluatedTree, errorTree }
    } catch (e) {
      return { evaluatedTree: oldLocalRawTree, errorTree }
    }
  }
}
