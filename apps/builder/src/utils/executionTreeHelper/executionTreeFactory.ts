import { Diff, diff } from "deep-diff"
import { cloneDeep, flatten, get, set, toPath, unset } from "lodash"
import toposort from "toposort"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { getContainerListDisplayNameMappedChildrenNodeDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import {
  DependenciesState,
  ErrorShape,
  ExecutionErrorType,
  ExecutionState,
} from "@/redux/currentApp/executionTree/executionState"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { getSnippets } from "@/utils/evaluateDynamicString/dynamicConverter"
import {
  getDisplayNameAndAttrPath,
  getWidgetOrActionDynamicAttrPaths,
  hasDynamicStringSnippet,
} from "@/utils/evaluateDynamicString/utils"
import { RawTreeShape } from "@/utils/executionTreeHelper/interface"
import {
  convertPathToString,
  extractReferencesFromScript,
  getImmediateParentsOfPropertyPaths,
  isAction,
  isWidget,
} from "@/utils/executionTreeHelper/utils"
import { isObject } from "@/utils/typeHelper"
import { VALIDATION_TYPES, validationFactory } from "@/utils/validationFactory"
import {
  IExecutionActions,
  runActionWithExecutionResult,
} from "../action/runAction"

const message = createMessage()

export const IGNORE_ACTION_RUN_ATTR_NAME = [
  "isRunning",
  "startTime",
  "endTime",
  "data",
  "runResult",
  "responseHeaders",
]

export const IGNORE_AUTO_RUN_WITH_RUN_SCRIPT_ATTR_RULES = [
  /events\[\d+\]\.script/,
  /content\.successEvent\[\d+\]\.script/,
  /content\.failedEvent\[\d+\]\.script/,
]

export const isRunScriptAttr = (attrPath: string) => {
  return IGNORE_AUTO_RUN_WITH_RUN_SCRIPT_ATTR_RULES.some((rule) => {
    return rule.test(attrPath)
  })
}

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
  runningActionsMap: Map<string, number> = new Map()

  constructor() {}

  destroyTree() {
    this.dependenciesState = {}
    this.inDependencyTree = {}
    this.evalOrder = []
    this.oldRawTree = {} as RawTreeShape
    this.hasCyclical = false
    this.executedTree = {} as RawTreeShape
    this.errorTree = {}
    this.debuggerData = {}
    this.allKeys = {}
    this.runningActionsMap = new Map()

    return undefined
  }

  initTree(rawTree: RawTreeShape) {
    const currentRawTree = cloneDeep(rawTree)
    this.oldRawTree = cloneDeep(currentRawTree)
    try {
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
    } catch (e) {
      return {
        dependencyTree: this.dependenciesState,
        evaluatedTree: currentRawTree,
        errorTree: this.errorTree,
        debuggerData: this.debuggerData,
        independencyTree: this.inDependencyTree,
      }
    }

    return {
      dependencyTree: this.dependenciesState,
      evaluatedTree: this.executedTree,
      errorTree: this.errorTree,
      debuggerData: this.debuggerData,
      independencyTree: this.inDependencyTree,
    }
  }

  validateTree(tree: RawTreeShape) {
    return Object.keys(tree).reduce((current: RawTreeShape, displayName) => {
      const widgetOrAction = current[displayName]
      if (!isWidget(widgetOrAction) && !isAction(widgetOrAction)) {
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
          const validationType = validationPaths[
            validationPath
          ] as VALIDATION_TYPES
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

  calcSubTreeSortOrder(
    differences: Diff<any, any>[],
    rawTree: RawTreeShape,
    isIgnoreDynamicPaths: boolean = false,
  ) {
    const changePaths: Set<string> = new Set()
    for (const diff of differences) {
      if (!Array.isArray(diff.path) || diff.path.length === 0) continue
      changePaths.add(convertPathToString(diff.path))
      const entityName = diff.path[0]
      const entity = rawTree[entityName]
      if (!entity) {
        continue
      }
      if (isIgnoreDynamicPaths) {
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
    const modifyDependencyTree = cloneDeep(inDependencyTree)
    Object.keys(modifyDependencyTree).forEach((key) => {
      modifyDependencyTree[key] = modifyDependencyTree[key].filter((value) => {
        return !changes.includes(value)
      })
    })

    while (true) {
      subSortOrderArray = this.getEvaluationSortOrder(
        parents,
        modifyDependencyTree,
      )
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

  mergeErrorTree(
    newErrorTree: Record<string, any>,
    paths: string[],
    isDeletedAction?: boolean,
  ) {
    const oldErrorTree = cloneDeep(this.errorTree)
    paths.forEach((path) => {
      if (isDeletedAction) {
        unset(oldErrorTree, path)
      }
      const newErrorTreeValue = get(newErrorTree, path)
      if (newErrorTreeValue) {
        set(oldErrorTree, path, newErrorTreeValue)
      } else {
        unset(oldErrorTree, path)
      }
    })
    this.errorTree = oldErrorTree
  }

  mergeDebugDataTree(
    newDebugDataTree: Record<string, any>,
    paths: string[],
    isDeletedAction?: boolean,
  ) {
    const oldDebugDataTree = cloneDeep(this.debuggerData)
    const allOldDebugDataPaths = Object.keys(oldDebugDataTree || {})
    paths.forEach((path) => {
      if (isDeletedAction) {
        allOldDebugDataPaths.forEach((dp) => {
          dp.includes(path) && delete oldDebugDataTree[dp]
        })
        return
      }
      const newDebugData = newDebugDataTree[path]
      if (newDebugData) {
        oldDebugDataTree[path] = newDebugData
      } else {
        delete oldDebugDataTree[path]
      }
    })
    this.debuggerData = oldDebugDataTree
  }

  updateExecutionTreeByUpdatePaths(
    paths: string[],
    executionTree: RawTreeShape,
    rawTree: RawTreeShape,
    walkedPath: Set<string>,
  ) {
    const currentExecutionTree = cloneDeep(executionTree)
    paths.forEach((path) => {
      if (!walkedPath.has(path)) {
        walkedPath.add(path)
        const rootPath = convertPathToString(toPath(path).slice(0, 2))
        const value = get(rawTree, rootPath, undefined)
        set(currentExecutionTree, rootPath, value)
      }
    })
    return currentExecutionTree
  }

  updateTree(rawTree: RawTreeShape, isDeleteAction?: boolean) {
    const currentRawTree = cloneDeep(rawTree)
    try {
      this.dependenciesState = this.generateDependenciesMap(currentRawTree)
      this.evalOrder = this.sortEvalOrder(this.dependenciesState)
      this.inDependencyTree = this.generateInDependenciesMap()
    } catch (e) {
      return {
        dependencyTree: this.dependenciesState,
        evaluatedTree: currentRawTree,
        errorTree: this.errorTree,
        debuggerData: this.debuggerData,
        independencyTree: this.inDependencyTree,
      }
    }

    const differences: Diff<RawTreeShape, RawTreeShape>[] =
      diff(this.oldRawTree, currentRawTree) || []
    if (differences.length === 0) {
      return {
        dependencyTree: this.dependenciesState,
        evaluatedTree: this.executedTree,
        errorTree: this.errorTree,
        independencyTree: this.inDependencyTree,
      }
    }
    this.oldRawTree = cloneDeep(currentRawTree)
    const updatePaths = this.getUpdatePathFromDifferences(differences)
    const walkedPath = new Set<string>()
    let currentExecution = this.updateExecutionTreeByUpdatePaths(
      updatePaths,
      this.executedTree,
      currentRawTree,
      walkedPath,
    )

    const path = this.calcSubTreeSortOrder(differences, currentExecution)
    currentExecution = this.updateExecutionTreeByUpdatePaths(
      path,
      currentExecution,
      currentRawTree,
      walkedPath,
    )
    const { evaluatedTree, errorTree, debuggerData } = this.executeTree(
      currentExecution,
      path,
      -1,
    )
    this.mergeErrorTree(errorTree, [...updatePaths, ...path], isDeleteAction)
    this.mergeDebugDataTree(
      debuggerData,
      [...updatePaths, ...path],
      isDeleteAction,
    )

    this.executedTree = this.validateTree(evaluatedTree)
    this.executedTree.globalData = evaluatedTree.root.globalData
    return {
      dependencyTree: this.dependenciesState,
      evaluatedTree: this.executedTree,
      errorTree: this.errorTree,
      debuggerData: this.debuggerData,
      independencyTree: this.inDependencyTree,
    }
  }

  setEvaluatedTree(executedTree: Record<string, any>) {
    this.executedTree = executedTree as RawTreeShape
  }

  getUpdatePathFromDifferences(
    differences: Diff<Record<string, any>, Record<string, any>>[],
  ) {
    const updatePaths: string[] = []
    for (const d of differences) {
      if (!Array.isArray(d.path) || d.path.length === 0) continue
      const subPaths = cloneDeep(d.path)
      let current = ""
      const originalPathLength = subPaths.length
      if (subPaths.includes("pageInfos")) {
        updatePaths.push("pageInfos")
        continue
      }

      while (subPaths.length > 1) {
        current = convertPathToString(subPaths)
        updatePaths.push(current)
        subPaths.pop()
      }
      if (originalPathLength === 1 && d.kind === "N") {
        const rhs = d.rhs
        if (rhs && typeof rhs === "object") {
          const keys = Object.keys(rhs)
          keys.forEach((key) => {
            updatePaths.push(`${convertPathToString([subPaths[0], key])}`)
          })
        }
      }
      if (originalPathLength === 1 && d.kind === "D") {
        updatePaths.push(`${subPaths[0]}`)
      }
      if (originalPathLength === 1 && d.kind === "E") {
        updatePaths.push(`${subPaths[0]}`)
      }
      if (d.kind === "A") {
        const { index } = d
        updatePaths.push(`${convertPathToString([...subPaths, index])}`)
      }
    }
    const hasPath = new Set<string>()
    return updatePaths.filter((path) => {
      if (hasPath.has(path)) return false
      hasPath.add(path)
      return true
    })
  }

  updateRawTreeByUpdatePaths(
    paths: string[],
    executionTree: Record<string, any>,
    walkedPath: Set<string>,
  ) {
    const currentExecutionTree = cloneDeep(executionTree)
    paths.forEach((path) => {
      if (!walkedPath.has(path)) {
        walkedPath.add(path)
        const fullPathValue = get(this.oldRawTree, path)
        if (hasDynamicStringSnippet(fullPathValue)) {
          const value = get(this.oldRawTree, path, undefined)
          set(currentExecutionTree, path, value)
        }
      }
    })
    return currentExecutionTree
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
    const walkedPath = new Set<string>()

    const updatePaths = this.getUpdatePathFromDifferences(differences)
    updatePaths.forEach((path) => {
      walkedPath.add(path)
    })

    const orderPath = this.calcSubTreeSortOrder(
      differences,
      currentExecutionTree as RawTreeShape,
      true,
    )

    let currentRawTree = this.updateRawTreeByUpdatePaths(
      orderPath,
      currentExecutionTree,
      walkedPath,
    ) as RawTreeShape

    const { evaluatedTree, errorTree, debuggerData } = this.executeTree(
      currentRawTree,
      orderPath,
    )
    this.mergeErrorTree(errorTree, [...updatePaths, ...orderPath])
    this.mergeDebugDataTree(debuggerData, [...updatePaths, ...orderPath])
    this.executedTree = this.validateTree(evaluatedTree)

    return {
      evaluatedTree: this.executedTree,
      errorTree: this.errorTree,
      debuggerData: this.debuggerData,
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
            return extractReferencesFromScript(script)
          } catch (e) {
            return []
          }
        }),
      ).filter((path) => {
        const [currentDisplayName, ..._currentPaths] = toPath(key)
        const [targetDisplayName, ..._targetPaths] = toPath(path)
        const currentNode = rawTree[currentDisplayName]
        const targetNode = rawTree[targetDisplayName]
        if (!currentNode || !targetNode) return path
        if (currentNode.$type === "WIDGET" && targetNode.$type === "WIDGET")
          return currentNode.$parentPageName === targetNode.$parentPageName
        return path
      })
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
          message.error({
            content: i18n.t("message.circular_dependency", {
              nodeName: entityName,
            }),
          })
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
          const requiredEval = hasDynamicStringSnippet(widgetOrActionAttribute)
          if (requiredEval) {
            try {
              evaluateValue = evaluateDynamicString(
                attrPath,
                widgetOrActionAttribute,
                current,
              )

              if (typeof evaluateValue === "function") {
                set(current, fullPath, undefined)
              } else {
                set(current, fullPath, evaluateValue)
              }
            } catch (e) {
              const oldError = get(errorTree, fullPath, []) as ErrorShape[]
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
          if (
            isAction(widgetOrAction) &&
            !IGNORE_ACTION_RUN_ATTR_NAME.includes(toPath(attrPath)[0])
          ) {
            for (let i = currentIndex + 1; i < sortedEvalOrder.length; i++) {
              const currentDynamicString = sortedEvalOrder[i]
              if (currentDynamicString.includes(widgetOrAction.displayName)) {
                return current
              }
            }
            if (
              widgetOrAction.actionType !== "transformer" &&
              widgetOrAction.triggerMode === "automate"
            ) {
              const { $actionID } = widgetOrAction

              const runningActionID = this.runningActionsMap.get($actionID)
              if (runningActionID) {
                window.clearTimeout(runningActionID)
              }
              const deleteID = window.setTimeout(() => {
                runActionWithExecutionResult(
                  widgetOrAction as IExecutionActions,
                )
              }, 300)
              this.runningActionsMap.set($actionID, deleteID)
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
