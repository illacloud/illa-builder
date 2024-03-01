import { getCurrentUser } from "@illa-public/user-data"
import { createSelector } from "@reduxjs/toolkit"
import { klona } from "klona/json"
import { get } from "lodash-es"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import {
  getAllComponentDisplayNameMapProps,
  getOriginalGlobalData,
  getPageNameMapDescendantNodeDisplayNames,
} from "@/redux/currentApp/components/componentsSelector"
import { RootState } from "@/store"
import { NeedBuildNode, buildForest } from "@/utils/componentNode/buildTree"
import { RawTreeFactory } from "@/utils/executionTreeHelper/rawTreeFactory"
import { recursiveDelete } from "@/utils/executionTreeHelper/rrecursiveDelete"
import { getEditorConfig } from "../../config/configSelector"
import { getClientWidgetLayoutInfo } from "../layoutInfo/layoutInfoSelector"
import { WidgetLayoutInfo } from "../layoutInfo/layoutInfoState"
import { getAllDescendantNodeDisplayNamesByExecution } from "../layoutInfo/utils"

export const getRawTree = createSelector(
  [
    getActionList,
    getAllComponentDisplayNameMapProps,
    getCurrentUser,
    getBuilderInfo,
    getOriginalGlobalData,
  ],
  (actions, widgets, currentUserInfo, builderInfo, globalData) => {
    return RawTreeFactory.create({
      actions: actions ?? [],
      widgets: widgets ?? {},
      currentUserInfo,
      builderInfo,
      globalData,
    })
  },
)

export const getCurrentApp = (state: RootState) => state.currentApp

export const getExecution = createSelector(
  [getCurrentApp],
  (currentApp) => currentApp.execution,
)

export const getExecutionResult = createSelector(
  [getExecution],
  (execution) => {
    return execution.result || {}
  },
)

export const getExecutionError = createSelector(
  [getExecution],
  (execution) => execution.error ?? {},
)

export const IGNORE_WIDGET_TYPES = new Set<string>([
  "PAGE_NODE",
  "SECTION_NODE",
  "CANVAS",
  "DOT_PANEL",
  "MODAL_SECTION_NODE",
])

export const getWidgetExecutionResult = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const widgetExecutionResult: Record<string, any> = {}
    Object.keys(executionResult).forEach((key) => {
      const widgetOrAction = executionResult[key]
      if (widgetOrAction && widgetOrAction.$type === "WIDGET") {
        widgetExecutionResult[key] = widgetOrAction
      }
    })
    return widgetExecutionResult
  },
)

export const getPageExecutionResultArray = createSelector(
  [getWidgetExecutionResult],
  (widgetExecutionResult) => {
    const widgetExecutionResultArray: Record<string, any>[] = []
    Object.keys(widgetExecutionResult).forEach((key) => {
      if (
        widgetExecutionResult[key] &&
        widgetExecutionResult[key].$widgetType === "PAGE_NODE"
      ) {
        widgetExecutionResultArray.push({
          ...widgetExecutionResult[key],
          displayName: key,
        })
      }
    })
    return widgetExecutionResultArray
  },
)

export const getSectionExecutionResultArray = createSelector(
  [getWidgetExecutionResult],
  (widgetExecutionResult) => {
    const sectionExecutionResult: Record<string, any> = {}
    Object.keys(widgetExecutionResult).forEach((key) => {
      if (
        widgetExecutionResult[key] &&
        widgetExecutionResult[key].$widgetType === "SECTION_NODE"
      ) {
        sectionExecutionResult[key] = {
          ...widgetExecutionResult[key],
          displayName: key,
        }
      }
    })
    return sectionExecutionResult
  },
)

export const getRootNodeExecutionResult = createSelector(
  [getWidgetExecutionResult],
  (widgetExecutionResult) => {
    const rootNode = widgetExecutionResult["root"]
    return rootNode
      ? rootNode
      : {
          currentPageIndex: 0,
          pageSortedKey: ["page1"],
          homepageDisplayName: "page1",
        }
  },
)

export const getActionExecutionResult = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const actionExecutionResult: Record<string, any> = {}
    Object.keys(executionResult).forEach((key) => {
      const widgetOrAction = executionResult[key]
      if (widgetOrAction && widgetOrAction.$type === "ACTION") {
        actionExecutionResult[key] = widgetOrAction
      }
    })
    return actionExecutionResult
  },
)

export const getActionExecutionResultWithOutIgnoreKey = createSelector(
  [getActionExecutionResult],
  (actionExecutionResult) => {
    return recursiveDelete(actionExecutionResult, ["displayName"])
  },
)

export const getActionExecutionResultArray = createSelector(
  [getActionExecutionResult],
  (actionExecutionResult) => {
    const actionExecutionResultArray: Record<string, any>[] = []
    Object.keys(actionExecutionResult).forEach((key) => {
      actionExecutionResultArray.push({
        ...actionExecutionResult[key],
        displayName: key,
      })
    })
    return actionExecutionResultArray
  },
)

export const getCurrentPageIndex = createSelector(
  [getRootNodeExecutionResult],
  (rootNode) => rootNode.currentPageIndex as number,
)

export const getCurrentPageDisplayName = createSelector(
  [getRootNodeExecutionResult],
  (rootNode) => {
    const { pageSortedKey, currentPageIndex } = rootNode
    if (currentPageIndex > pageSortedKey.lengths)
      return pageSortedKey[0] as string
    return pageSortedKey[currentPageIndex] as string
  },
)

export const getExecutionResultToGlobalCodeMirror = createSelector(
  [getExecutionResult],
  (executionResult) => {
    const result: Record<string, unknown> = {}
    Object.keys(executionResult).forEach((key) => {
      if (
        !IGNORE_WIDGET_TYPES.has(executionResult[key]?.$widgetType) &&
        executionResult[key] != undefined
      ) {
        result[key] = klona(executionResult[key])
      }
    })
    return result
  },
)

export const getExecutionResultToCurrentPageCodeMirror = createSelector(
  [
    getCurrentPageDisplayName,
    getPageNameMapDescendantNodeDisplayNames,
    getExecutionResult,
  ],
  (
    currentPageDisplayName,
    pageNameMapDescendantNodeDisplayNames,
    executionResult,
  ) => {
    const currentPageWidgets =
      pageNameMapDescendantNodeDisplayNames[currentPageDisplayName]
    const result: Record<string, unknown> = {}
    Object.keys(executionResult).forEach((key) => {
      const currentSeed = executionResult[key]
      if (
        currentSeed != undefined &&
        currentSeed.$type === "WIDGET" &&
        !IGNORE_WIDGET_TYPES.has(executionResult[key]?.$widgetType) &&
        currentPageWidgets.includes(key)
      ) {
        result[key] = klona(executionResult[key])
      }
      if (currentSeed && currentSeed.$type !== "WIDGET") {
        result[key] = klona(executionResult[key])
      }
    })
    return result
  },
)

export const getDependenciesMap = (state: RootState) => {
  return state.currentApp.execution.dependencies
}

export const getInDependenciesMap = (state: RootState) => {
  return state.currentApp.execution.independencies
}

export const getGlobalDataExecutionResult = createSelector(
  [getExecutionResult],
  (result) => {
    return get(result, "globalData", {})
  },
)

export const getBuilderInfoExecutionResult = createSelector(
  [getExecutionResult],
  (result) => get(result, "builderInfo", {}),
)

export const getCurrentUserInfoExecutionResult = createSelector(
  [getExecutionResult],
  (result) => get(result, "currentUserInfo", {}),
)

export const getURLParamsExecutionResult = createSelector(
  getExecutionResult,
  (result) => {
    return get(result, "urlParams", {})
  },
)

export const getLocalStorageExecutionResult = createSelector(
  getExecutionResult,
  (result) => {
    return get(result, "localStorage", {})
  },
)

export const getPageInfosExecutionResult = createSelector(
  getExecutionResult,
  (result) => {
    return get(result, "pageInfos", {})
  },
)

export const getCurrentPageInfoExecutionResult = createSelector(
  getExecutionResult,
  (result) => {
    return get(result, "currentPageInfo", {})
  },
)

export const getGlobalInfoExecutionResult = createSelector(
  [
    getCurrentUserInfoExecutionResult,
    getBuilderInfoExecutionResult,
    getURLParamsExecutionResult,
    getLocalStorageExecutionResult,
    getPageInfosExecutionResult,
    getCurrentPageInfoExecutionResult,
    getGlobalDataExecutionResult,
  ],
  (
    currentUserInfo,
    builderInfo,
    urlParams,
    localStorage,
    pageInfos,
    currentPageInfo,
    globalData,
  ) => {
    let result: Record<string, unknown> = recursiveDelete({
      currentUserInfo,
      builderInfo,
      urlParams,
      localStorage,
      pageInfos,
      currentPageInfo,
    })
    const ignoredGlobalData = recursiveDelete(globalData)
    if (Object.keys(ignoredGlobalData).length > 0) {
      result.globalData = ignoredGlobalData
    }

    return result
  },
)

export const getPageLoadingActions = createSelector(
  [getActionExecutionResultArray],
  (actionResult) => {
    return actionResult.filter(
      (action) => action.config?.advancedConfig.runtime === "pageLoading",
    )
  },
)

export const getAppLoadedActions = createSelector(
  [getActionExecutionResultArray],
  (actions) => {
    return actions.filter(
      (action) => action.config?.advancedConfig.runtime === "appLoaded",
    )
  },
)

export const getIntervalActions = createSelector(
  [getActionExecutionResultArray],
  (actions) => {
    return actions.filter(
      (action) => action?.config?.advancedConfig.isPeriodically,
    )
  },
)

export const getCurrentPageWidgetExecutionResultArray = createSelector(
  [
    getCurrentPageDisplayName,
    getPageNameMapDescendantNodeDisplayNames,
    getWidgetExecutionResult,
  ],
  (
    currentPageDisplayName,
    pageNameMapDescendantNodeDisplayNames,
    widgetExecutionResult,
  ) => {
    const descendantNodeDisplayNames =
      pageNameMapDescendantNodeDisplayNames[currentPageDisplayName]
    if (!Array.isArray(descendantNodeDisplayNames)) return []
    const widgetExecutionResultArray: Record<string, any>[] = []
    descendantNodeDisplayNames.forEach((displayName) => {
      if (!widgetExecutionResult[displayName]) return
      widgetExecutionResultArray.push({
        ...widgetExecutionResult[displayName],
        displayName,
      })
    })
    return widgetExecutionResultArray
  },
)

export const getCurrentPageGeneralWidgetExecutionResultArray = createSelector(
  [getCurrentPageWidgetExecutionResultArray],
  (currentPageWidgetExecutionResult) => {
    const widgetExecutionResultArray: Record<string, any>[] = []
    currentPageWidgetExecutionResult.forEach((widget) => {
      if (!IGNORE_WIDGET_TYPES.has(widget.$widgetType)) {
        widgetExecutionResultArray.push(widget)
      }
    })
    return widgetExecutionResultArray
  },
)

export const getCurrentPageModalWidgetExecutionResultArray = createSelector(
  [getCurrentPageWidgetExecutionResultArray],
  (currentPageWidgetExecutionResult) => {
    const widgetExecutionResultArray: Record<string, any>[] = []
    currentPageWidgetExecutionResult.forEach((widget) => {
      if (widget.$widgetType === "MODAL_WIDGET") {
        widgetExecutionResultArray.push(widget)
      }
    })
    return widgetExecutionResultArray
  },
)

const getTargetSectionWidget = (
  targetSectionName: string,
  currentPageWidgets: NeedBuildNode[],
  widgets: Record<string, WidgetLayoutInfo>,
) => {
  const targetSection = currentPageWidgets.find((widget) =>
    widget.displayName.startsWith(targetSectionName),
  )
  const targetSectionMapHasNodeDisplayNames: Record<string, string[]> = {}
  if (targetSection) {
    switch (targetSectionName) {
      case "modalSection": {
        const childrenModalWidgets = targetSection.$childrenNode
        childrenModalWidgets.forEach((displayName: string) => {
          const viewWidget = widgets[displayName]
          if (viewWidget) {
            const descendantNodeDisplayNames =
              getAllDescendantNodeDisplayNamesByExecution(viewWidget, widgets)
            targetSectionMapHasNodeDisplayNames[displayName] =
              descendantNodeDisplayNames
          }
        })

        const result: NeedBuildNode[] = []
        Object.values(targetSectionMapHasNodeDisplayNames).forEach(
          (displayNames) => {
            displayNames.forEach((displayName) => {
              const widget = currentPageWidgets.find((widget) => {
                return widget.displayName === displayName
              })
              if (widget) {
                result.push(widget)
              }
            })
          },
        )
        return result
      }
      default: {
        const currentViewIndex = targetSection.currentViewIndex as number
        const viewDisplayNames = targetSection.$childrenNode
        const currentViewDisplayName = viewDisplayNames[currentViewIndex]

        if (!currentViewDisplayName) return []
        viewDisplayNames.forEach((displayName: string) => {
          const viewWidget = widgets[displayName]
          if (viewWidget) {
            const descendantNodeDisplayNames =
              getAllDescendantNodeDisplayNamesByExecution(viewWidget, widgets)
            targetSectionMapHasNodeDisplayNames[displayName] =
              descendantNodeDisplayNames
          }
        })
        const currentSectionWidgets =
          targetSectionMapHasNodeDisplayNames[currentViewDisplayName]
        if (!currentSectionWidgets) return []
        return currentPageWidgets.filter((widget) =>
          currentSectionWidgets.includes(widget.displayName),
        )
      }
    }
  }

  return []
}

export const getCurrentPageBodyWidgetTree = createSelector(
  [getCurrentPageWidgetExecutionResultArray, getClientWidgetLayoutInfo],
  (currentPageWidgets, widgets) => {
    return buildForest(
      getTargetSectionWidget(
        "bodySection",
        currentPageWidgets as NeedBuildNode[],
        widgets,
      ),
      widgets,
    )
  },
)

export const getCurrentPageFooterWidgetTree = createSelector(
  [getCurrentPageWidgetExecutionResultArray, getClientWidgetLayoutInfo],
  (currentPageWidgets, widgets) => {
    return buildForest(
      getTargetSectionWidget(
        "footerSection",
        currentPageWidgets as NeedBuildNode[],
        widgets,
      ),
      widgets,
    )
  },
)
export const getCurrentPageLeftWidgetTree = createSelector(
  [getCurrentPageWidgetExecutionResultArray, getClientWidgetLayoutInfo],
  (currentPageWidgets, widgets) => {
    return buildForest(
      getTargetSectionWidget(
        "leftSection",
        currentPageWidgets as NeedBuildNode[],
        widgets,
      ),
      widgets,
    )
  },
)
export const getCurrentPageHeaderWidgetTree = createSelector(
  [getCurrentPageWidgetExecutionResultArray, getClientWidgetLayoutInfo],
  (currentPageWidgets, widgets) => {
    return buildForest(
      getTargetSectionWidget(
        "headerSection",
        currentPageWidgets as NeedBuildNode[],
        widgets,
      ),
      widgets,
    )
  },
)
export const getCurrentPageRightWidgetTree = createSelector(
  [getCurrentPageWidgetExecutionResultArray, getClientWidgetLayoutInfo],
  (currentPageWidgets, widgets) => {
    return buildForest(
      getTargetSectionWidget(
        "rightSection",
        currentPageWidgets as NeedBuildNode[],
        widgets,
      ),
      widgets,
    )
  },
)
export const getCurrentPageModalWidgetTree = createSelector(
  [getCurrentPageWidgetExecutionResultArray, getClientWidgetLayoutInfo],
  (currentPageWidgets, widgets) => {
    return buildForest(
      getTargetSectionWidget(
        "modalSection",
        currentPageWidgets as NeedBuildNode[],
        widgets,
      ),
      widgets,
    )
  },
)

export const getDraggingComponentIDs = createSelector(
  [getEditorConfig],
  (editorConfig) => editorConfig.draggingComponentIDs,
)

export const getResizingComponentIDs = createSelector(
  [getEditorConfig],
  (editorConfig) => {
    return editorConfig.resizingComponentIDs
  },
)

export const getIsDragging = createSelector(
  [getDraggingComponentIDs],
  (ids) => {
    return ids.length > 0
  },
)

export const getIsResizing = createSelector(
  [getResizingComponentIDs],
  (ids) => {
    return ids.length > 0
  },
)

export const getCurrentPageStyle = createSelector(
  [getCurrentPageDisplayName, getExecutionResult],
  (currentPageDisplayName, executionResult) => {
    return get(executionResult, `${currentPageDisplayName}.style`, {})
  },
)

export const getCurrentPageExecutionResult = createSelector(
  [getCurrentPageDisplayName, getExecutionResult],
  (currentPageDisplayName, executionResult) => {
    return get(executionResult, `${currentPageDisplayName}`, {})
  },
)

export const getCurrentPageBodySection = createSelector(
  [getCurrentPageDisplayName, getExecutionResult],
  (currentPageDisplayName, executionResult) => {
    const currentPageNode = get(executionResult, currentPageDisplayName)
    if (!currentPageNode) return undefined
    const childDisplayName = currentPageNode.$childrenNode.find(
      (displayName: string) => {
        const node = get(executionResult, displayName)
        return (
          node &&
          node?.$widgetType === "SECTION_NODE" &&
          node?.displayName.startsWith("bodySection")
        )
      },
    )
    if (!childDisplayName) return undefined
    return get(executionResult, childDisplayName)
  },
)

export const getCurrentPageLeftSection = createSelector(
  [getCurrentPageDisplayName, getExecutionResult],
  (currentPageDisplayName, executionResult) => {
    const currentPageNode = get(executionResult, currentPageDisplayName)
    if (!currentPageNode) return undefined
    const childDisplayName = currentPageNode.$childrenNode.find(
      (displayName: string) => {
        const node = get(executionResult, displayName)
        return (
          node &&
          node?.$widgetType === "SECTION_NODE" &&
          node?.displayName.startsWith("leftSection")
        )
      },
    )
    if (!childDisplayName) return undefined
    return get(executionResult, childDisplayName)
  },
)

export const getCurrentPageRightSection = createSelector(
  [getCurrentPageDisplayName, getExecutionResult],
  (currentPageDisplayName, executionResult) => {
    const currentPageNode = get(executionResult, currentPageDisplayName)
    if (!currentPageNode) return undefined
    const childDisplayName = currentPageNode.$childrenNode.find(
      (displayName: string) => {
        const node = get(executionResult, displayName)
        return (
          node &&
          node?.$widgetType === "SECTION_NODE" &&
          node?.displayName.startsWith("rightSection")
        )
      },
    )
    if (!childDisplayName) return undefined
    return get(executionResult, childDisplayName)
  },
)

export const getCurrentPageHeaderSection = createSelector(
  [getCurrentPageDisplayName, getExecutionResult],
  (currentPageDisplayName, executionResult) => {
    const currentPageNode = get(executionResult, currentPageDisplayName)
    if (!currentPageNode) return undefined
    const childDisplayName = currentPageNode.$childrenNode.find(
      (displayName: string) => {
        const node = get(executionResult, displayName)
        return (
          node &&
          node?.$widgetType === "SECTION_NODE" &&
          node?.displayName.startsWith("headerSection")
        )
      },
    )
    if (!childDisplayName) return undefined
    return get(executionResult, childDisplayName)
  },
)

export const getCurrentPageFooterSection = createSelector(
  [getCurrentPageDisplayName, getExecutionResult],
  (currentPageDisplayName, executionResult) => {
    const currentPageNode = get(executionResult, currentPageDisplayName)
    if (!currentPageNode) return undefined
    const childDisplayName = currentPageNode.$childrenNode.find(
      (displayName: string) => {
        const node = get(executionResult, displayName)
        return (
          node &&
          node?.$widgetType === "SECTION_NODE" &&
          node?.displayName.startsWith("footerSection")
        )
      },
    )
    if (!childDisplayName) return undefined
    return get(executionResult, childDisplayName)
  },
)

export const getCurrentPageModalSection = createSelector(
  [getCurrentPageDisplayName, getExecutionResult],
  (currentPageDisplayName, executionResult) => {
    const currentPageNode = get(executionResult, currentPageDisplayName)
    if (!currentPageNode) return undefined
    const childDisplayName = currentPageNode.$childrenNode.find(
      (displayName: string) => {
        const node = get(executionResult, displayName)
        return (
          node &&
          node.$widgetType === "MODAL_SECTION_NODE" &&
          node.displayName.startsWith("modalSection")
        )
      },
    )
    if (!childDisplayName) return undefined
    return get(executionResult, childDisplayName)
  },
)
