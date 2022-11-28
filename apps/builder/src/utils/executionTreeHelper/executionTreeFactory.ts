import { isObject } from "@/utils/typeHelper"
import { RawTreeShape } from "@/utils/executionTreeHelper/interface"
import { cloneDeep, flatten, get, set, unset } from "lodash"
import {
  getAllPaths,
  getDisplayNameAndAttrPath,
  getWidgetOrActionDynamicAttrPaths,
  isDynamicString,
  wrapFunctionCode,
} from "@/utils/evaluateDynamicString/utils"
import { getSnippets } from "@/utils/evaluateDynamicString/dynamicConverter"
import toposort from "toposort"
import {
  DependenciesState,
  ExecutionErrorType,
  ExecutionState,
} from "@/redux/currentApp/executionTree/executionState"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import {
  convertPathToString,
  extractReferencesFromScript,
  getImmediateParentsOfPropertyPaths,
  isAction,
  isWidget,
} from "@/utils/executionTreeHelper/utils"
import { validationFactory } from "@/utils/validationFactory"
import { applyChange, Diff, diff } from "deep-diff"
import { runAction } from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import { getContainerListDisplayNameMappedChildrenNodeDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import store from "@/store"

export class ExecutionTreeFactory {
  dependenciesState: DependenciesState = {}
  inDependencyTree: DependenciesState = {}
  evalOrder: string[] = []
  oldRawTree: RawTreeShape = {} as RawTreeShape
  hasCyclical: boolean = false
  executedTree: RawTreeShape = {} as RawTreeShape
  errorTree: Record<string, any> = {}
  debuggerData: Record<string, any> = {}
  allKeys: Record<string, true> = {}

  constructor() {}

  initTree(rawTree: RawTreeShape) {
    const currentRawTree = cloneDeep(rawTree)
    this.oldRawTree = cloneDeep(currentRawTree)

    this.dependenciesState = this.generateDependenciesMap(currentRawTree)
    this.evalOrder = this.sortEvalOrder(this.dependenciesState)
    this.inDependencyTree = this.generateInDependenciesMap()
    const { evaluatedTree, errorTree, debuggerData } = this.executeTree(
      currentRawTree,
      this.evalOrder,
    )
    this.errorTree = errorTree
    this.debuggerData = debuggerData
    this.executedTree = this.validateTree(evaluatedTree)
    return {
      dependencyTree: this.dependenciesState,
      evaluatedTree: this.executedTree,
      errorTree: this.errorTree,
      debuggerData: this.debuggerData,
    }
  }

  validateTree(tree: RawTreeShape) {
    return Object.keys(tree).reduce((current: RawTreeShape, displayName) => {
      const widgetOrAction = current[displayName]
      if (!isWidget(widgetOrAction)) {
        return current
      }
      const validationPaths = widgetOrAction.$validationPaths
      const listWidgets =
        getContainerListDisplayNameMappedChildrenNodeDisplayName(
          store.getState(),
        )
      const listWidgetDisplayNames = Object.keys(listWidgets)
      let currentListDisplayName = ""
      for (let i = 0; i < listWidgetDisplayNames.length; i++) {
        if (listWidgets[listWidgetDisplayNames[i]].includes(displayName)) {
          currentListDisplayName = listWidgetDisplayNames[i]
          break
        }
      }
      if (isObject(validationPaths)) {
        Object.keys(validationPaths).forEach((validationPath) => {
          const validationType = validationPaths[validationPath]
          const fullPath = `${displayName}.${validationPath}`
          const validationFunc = validationFactory[validationType]
          const value = get(widgetOrAction, validationPath)
          const { isValid, safeValue, errorMessage } = validationFunc(
            value,
            currentListDisplayName,
          )
          set(current, fullPath, safeValue)
          if (!isValid) {
            let error = get(this.errorTree, fullPath)
            if (!Array.isArray(error)) {
              error = []
            }
            error.push({
              errorType: ExecutionErrorType.VALIDATION,
              errorMessage: errorMessage as string,
              errorName: "Validation",
            })
            set(this.errorTree, fullPath, error)
            this.debuggerData[fullPath] = error
          } else {
            let error = get(this.errorTree, fullPath)
            if (Array.isArray(error)) {
              const validationIndex = error.findIndex((v) => {
                return v.errorType === ExecutionErrorType.VALIDATION
              })
              if (validationIndex !== -1) {
                error.splice(validationIndex, 1)
                if (error.length === 0) {
                  unset(this.errorTree, fullPath)
                  delete this.debuggerData[fullPath]
                }
              }
            }
          }
        })
      }

      return current
    }, tree)
  }

  applyDifferencesToEvalTree(differences: Diff<any, any>[]) {
    const resultExecutedTree = cloneDeep(this.executedTree)
    for (const d of differences) {
      if (!Array.isArray(d.path) || d.path.length === 0) continue
      applyChange(resultExecutedTree, undefined, d)
    }
    this.executedTree = resultExecutedTree
  }

  calcSubTreeSortOrder(differences: Diff<any, any>[], rawTree: RawTreeShape) {
    const changePaths: Set<string> = new Set()
    for (const diff of differences) {
      if (!Array.isArray(diff.path) || diff.path.length === 0) continue
      changePaths.add(convertPathToString(diff.path))
      const entityName = diff.path[0]
      const entity = rawTree[entityName]
      if (!entity) {
        continue
      }
      const dynamic: string[] = entity.$dynamicAttrPaths
      dynamic?.forEach((attr) => {
        changePaths.add(`${entityName}.${attr}`)
      })
    }
    return this.getCompleteSortOrder(
      Array.from(changePaths),
      this.inDependencyTree,
    )
  }

  getEvaluationSortOrder(
    changes: Array<string>,
    inverseMap: DependenciesState,
  ): Array<string> {
    const sortOrder: Array<string> = [...changes]
    let iterator = 0
    while (iterator < sortOrder.length) {
      const newNodes = inverseMap[sortOrder[iterator]]
      if (newNodes) {
        newNodes.forEach((toBeEvaluatedNode) => {
          if (!sortOrder.includes(toBeEvaluatedNode)) {
            sortOrder.push(toBeEvaluatedNode)
          }
        })
      }
      iterator++
    }
    return sortOrder
  }

  getCompleteSortOrder(changes: string[], inDependencyTree: DependenciesState) {
    let sortOrders: string[] = []
    let parents = cloneDeep(changes)
    let subSortOrderArray: string[]
    while (true) {
      subSortOrderArray = this.getEvaluationSortOrder(parents, inDependencyTree)
      sortOrders = [...sortOrders, ...subSortOrderArray]
      parents = getImmediateParentsOfPropertyPaths(subSortOrderArray)
      if (parents.length <= 0) {
        break
      }
    }
    const sortOrderSet = new Set(sortOrders)
    const sortOrderPropertyPaths: string[] = []
    this.evalOrder.forEach((path) => {
      if (sortOrderSet.has(path)) {
        sortOrderPropertyPaths.push(path)
        sortOrderSet.delete(path)
      }
    })

    const completeSortOrder = [
      ...Array.from(sortOrderSet),
      ...sortOrderPropertyPaths,
    ]

    const finalSortOrderArray: Array<string> = []
    completeSortOrder.forEach((propertyPath) => {
      const lastIndexOfDot = propertyPath.lastIndexOf(".")
      if (lastIndexOfDot !== -1) {
        finalSortOrderArray.push(propertyPath)
      }
    })
    return finalSortOrderArray
  }

  mergeErrorTree(newErrorTree: Record<string, any>, paths: string[]) {
    const oldErrorTree = cloneDeep(this.errorTree)
    paths.forEach((path) => {
      const newErrorTreeValue = get(newErrorTree, path)
      if (newErrorTreeValue) {
        set(oldErrorTree, path, newErrorTreeValue)
      } else {
        unset(oldErrorTree, path)
      }
    })
    this.errorTree = oldErrorTree
  }

  mergeDebugDataTree(newDebugDataTree: Record<string, any>, paths: string[]) {
    paths.forEach((path) => {
      const newDebugData = newDebugDataTree[path]
      if (newDebugData) {
        this.debuggerData[path] = newDebugData
      } else {
        delete this.debuggerData[path]
      }
    })
  }

  updateTree(rawTree: RawTreeShape) {
    const currentRawTree = cloneDeep(rawTree)
    this.dependenciesState = this.generateDependenciesMap(currentRawTree)
    this.evalOrder = this.sortEvalOrder(this.dependenciesState)
    this.inDependencyTree = this.generateInDependenciesMap()
    const differences: Diff<RawTreeShape, RawTreeShape>[] =
      diff(this.oldRawTree, currentRawTree) || []
    if (differences.length === 0) {
      return {
        dependencyTree: this.dependenciesState,
        evaluatedTree: this.executedTree,
        errorTree: this.errorTree,
      }
    }
    this.applyDifferencesToEvalTree(differences)
    const path = this.calcSubTreeSortOrder(differences, currentRawTree)

    path.forEach((propertyPath) => {
      const unEvalPropValue = get(currentRawTree, propertyPath)
      const evalPropValue = get(this.executedTree, propertyPath)
      if (typeof evalPropValue !== "function") {
        set(this.executedTree, propertyPath, unEvalPropValue)
      }
      return propertyPath
    })
    const { evaluatedTree, errorTree, debuggerData } = this.executeTree(
      this.executedTree,
      path,
    )

    this.oldRawTree = cloneDeep(currentRawTree)
    this.mergeErrorTree(errorTree, path)
    this.mergeDebugDataTree(debuggerData, path)

    this.executedTree = this.validateTree(evaluatedTree)
    return {
      dependencyTree: this.dependenciesState,
      evaluatedTree: this.executedTree,
      errorTree: this.errorTree,
      debuggerData: this.debuggerData,
    }
  }

  getUpdatePathFromDifferences(
    differences: Diff<Record<string, any>, Record<string, any>>[],
  ) {
    const updatePaths: string[] = []
    for (const d of differences) {
      if (!Array.isArray(d.path) || d.path.length === 0) continue
      updatePaths.push(d.path.join("."))
    }
    return updatePaths
  }

  updateRawTreeByUpdatePaths(
    paths: string[],
    executionTree: Record<string, any>,
  ) {
    const currentRawTree = cloneDeep(this.oldRawTree)
    paths.forEach((path) => {
      const rootPath = path.split(".").slice(0, 2).join(".")
      const value = get(executionTree, rootPath, undefined)
      set(currentRawTree, rootPath, value)
    })
    return currentRawTree
  }

  updateTreeFromExecution(executionTree: Record<string, any>) {
    const currentExecutionTree = cloneDeep(executionTree)
    const differences: Diff<Record<string, any>, Record<string, any>>[] =
      diff(this.executedTree, currentExecutionTree) || []
    if (differences.length === 0) {
      return {
        evaluatedTree: this.executedTree,
      }
    }
    const updatePaths = this.getUpdatePathFromDifferences(differences)
    const currentRawTree = this.updateRawTreeByUpdatePaths(
      updatePaths,
      currentExecutionTree,
    )
    const orderPath = this.calcSubTreeSortOrder(differences, currentRawTree)
    const { evaluatedTree } = this.executeTree(currentRawTree, orderPath)
    const differencesRawTree: Diff<Record<string, any>, Record<string, any>>[] =
      diff(this.oldRawTree, evaluatedTree) || []
    this.applyDifferencesToEvalTree(differencesRawTree)
    this.applyDifferencesToEvalTree(differences)
    this.executedTree = this.validateTree(this.executedTree)
    return {
      evaluatedTree: this.executedTree,
      errorTree: this.errorTree,
    }
  }

  listEntityDependencies(
    widgetOrAction: Record<string, any>,
    displayName: string,
  ) {
    let dependenciesMap: DependenciesState = {}
    const dynamicAttrPaths: string[] =
      getWidgetOrActionDynamicAttrPaths(widgetOrAction)
    if (dynamicAttrPaths.length) {
      dynamicAttrPaths.forEach((attrPath) => {
        const originValue = get(widgetOrAction, attrPath)
        const { jsSnippets } = getSnippets(originValue)
        const existingDeps = dependenciesMap[`${displayName}.${attrPath}`] || []
        dependenciesMap[`${displayName}.${attrPath}`] = existingDeps.concat(
          jsSnippets.filter((jsSnippet) => !!jsSnippet),
        )
      })
    }
    return dependenciesMap
  }

  generateDependenciesMap(rawTree: RawTreeShape) {
    let dependenciesMap: DependenciesState = {}
    const allKeys = getAllPaths(rawTree)
    Object.keys(rawTree).forEach((displayName) => {
      const widgetProps = rawTree[displayName]
      const widgetOrActionDependencies = this.listEntityDependencies(
        widgetProps,
        displayName,
      )
      dependenciesMap = { ...dependenciesMap, ...widgetOrActionDependencies }
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
    const debuggerData: ExecutionState["error"] = {}
    try {
      const evaluatedTree = sortedEvalOrder.reduce(
        (current: RawTreeShape, fullPath: string, currentIndex: number) => {
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
              set(current, fullPath, evaluateValue)
            } catch (e) {
              let oldError = get(errorTree, fullPath) ?? []
              if (Array.isArray(oldError)) {
                oldError.push({
                  errorType: ExecutionErrorType.EVALUATED,
                  errorMessage: (e as Error).message,
                  errorName: (e as Error).name,
                })
              }

              set(errorTree, fullPath, oldError)
              set(current, fullPath, undefined)
              debuggerData[fullPath] = oldError
            }
          }
          if (isAction(widgetOrAction)) {
            for (let i = currentIndex + 1; i < sortedEvalOrder.length; i++) {
              const currentDynamicString = sortedEvalOrder[i]
              if (currentDynamicString.includes(widgetOrAction.displayName)) {
                return current
              }
            }
            if (widgetOrAction.actionType === "transformer") {
              const evaluateTransform = wrapFunctionCode(
                widgetOrAction.content.transformerString,
              )
              const canEvalString = `{{${evaluateTransform}()}}`
              let calcResult = ""
              try {
                calcResult = evaluateDynamicString("", canEvalString, current)
                set(current, `${widgetOrAction.displayName}.value`, calcResult)
              } catch (e) {
                console.log(e)
              }
            }
            if (
              widgetOrAction.actionType !== "transformer" &&
              widgetOrAction.triggerMode === "automate"
            ) {
              const {
                $actionId,
                $resourceId,
                actionType,
                content,
                displayName,
                transformer,
                triggerMode,
              } = widgetOrAction
              const action = {
                actionId: $actionId,
                resourceId: $resourceId,
                actionType,
                content,
                displayName,
                transformer,
                triggerMode,
              }
              runAction(action, () => {}, true)
            }
          }
          return current
        },
        oldLocalRawTree,
      )
      return { evaluatedTree, errorTree, debuggerData }
    } catch (e) {
      return { evaluatedTree: oldLocalRawTree, errorTree, debuggerData }
    }
  }
}
