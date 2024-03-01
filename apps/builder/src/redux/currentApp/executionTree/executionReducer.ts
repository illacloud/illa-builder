import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { applyChange } from "deep-diff"
import { has, set } from "lodash-es"
import {
  DependenciesState,
  ErrorShape,
  ExecutionState,
  UpdateCurrentPagePathPayload,
  UpdateExecutionByDisplayNamePayload,
  executionInitialState,
  setExecutionResultPayload,
} from "@/redux/currentApp/executionTree/executionState"
import { CUSTOM_STORAGE_PREFIX } from "@/utils/storage"
import { isObject } from "@/utils/typeHelper"

export const setDependenciesReducer: CaseReducer<
  ExecutionState,
  PayloadAction<DependenciesState>
> = (state, action) => {
  state.dependencies = action.payload
}

export const setIndependenciesReducer: CaseReducer<
  ExecutionState,
  PayloadAction<DependenciesState>
> = (state, action) => {
  state.independencies = action.payload
}

export const setExecutionResultReducer: CaseReducer<
  ExecutionState,
  PayloadAction<setExecutionResultPayload>
> = (state, action) => {
  const { updates } = action.payload
  if (updates.length === 0) {
    return state
  }

  for (const update of updates) {
    if (!Array.isArray(update.path) || update.path.length === 0) {
      continue
    }
    try {
      applyChange(state.result, undefined, update)
    } catch (e) {
      console.error(e)
    }
  }
}

export const setExecutionErrorReducer: CaseReducer<
  ExecutionState,
  PayloadAction<Record<string, ErrorShape[]>>
> = (state, action) => {
  state.error = action.payload
}

export const startExecutionReducer: CaseReducer<
  ExecutionState,
  PayloadAction<void>
> = (state) => {
  return state
}

export const updateExecutionByDisplayNameReducer: CaseReducer<
  ExecutionState,
  PayloadAction<UpdateExecutionByDisplayNamePayload>
> = (state, action) => {
  const { displayName, value } = action.payload
  state.result[displayName] = {
    ...state.result[displayName],
    ...value,
  }
}

export const updateExecutionByMultiDisplayNameReducer: CaseReducer<
  ExecutionState,
  PayloadAction<UpdateExecutionByDisplayNamePayload[]>
> = (state, action) => {
  action.payload.forEach(({ displayName, value }) => {
    state.result[displayName] = {
      ...state.result[displayName],
      ...value,
    }
  })
}

export const updateModalDisplayReducer: CaseReducer<
  ExecutionState,
  PayloadAction<{
    displayName: string
    display: boolean
  }>
> = (state, action) => {
  const result = state.result
  const currentNode = result[action.payload.displayName]
  if (!currentNode) return state
  const parentNodeDisplayName = currentNode.$parentNode
  if (!parentNodeDisplayName) return state
  const parentNode = result[parentNodeDisplayName]
  if (
    !parentNode ||
    !Array.isArray(parentNode.$childrenNode) ||
    parentNode.$childrenNode.length === 0
  )
    return state
  const otherNodeDisplayNames = parentNode.$childrenNode.filter(
    (key: string) => key !== action.payload.displayName,
  )
  currentNode.isVisible = action.payload.display
  if (action.payload.display) {
    otherNodeDisplayNames.forEach((key: string) => {
      const node = result[key]
      if (node) {
        node.isVisible = false
      }
    })
  }
}

export const resetExecutionResultReducer: CaseReducer<
  ExecutionState,
  PayloadAction
> = () => {
  return executionInitialState
}

export const setGlobalStateInExecutionReducer: CaseReducer<
  ExecutionState,
  PayloadAction<{
    key: string
    value: unknown
  }>
> = (state, action) => {
  const result = state.result
  if (!result) return
  const globalState = result.globalData
  const rootNode = result.root
  const rootGlobalState = rootNode.globalData
  if (!globalState || !rootGlobalState) return
  globalState[action.payload.key] = action.payload.value
  rootGlobalState[action.payload.key] = action.payload.value
}

export const setInGlobalStateInExecutionReducer: CaseReducer<
  ExecutionState,
  PayloadAction<{
    key: string
    path: string
    value: unknown
  }>
> = (state, action) => {
  const result = state.result
  if (!result) return
  const globalState = result.globalData
  const rootNode = result.root
  const rootGlobalState = rootNode.globalData
  if (!isObject(globalState) || !isObject(rootGlobalState)) return
  const targetState = globalState[action.payload.key]
  const targetRootState = rootGlobalState[action.payload.key]
  if (
    (isObject(targetState) || Array.isArray(targetState)) &&
    has(targetState, action.payload.path)
  ) {
    set(targetState, action.payload.path, action.payload.value)
    set(
      targetRootState as Record<string, any>,
      action.payload.path,
      action.payload.value,
    )
  }
}

export const clearLocalStorageInExecutionReducer: CaseReducer<
  ExecutionState,
  PayloadAction
> = (state) => {
  state.result.localStorage = {}
  window.localStorage.removeItem(CUSTOM_STORAGE_PREFIX)
}

export const setLocalStorageInExecutionReducer: CaseReducer<
  ExecutionState,
  PayloadAction<{
    key: string
    value: unknown
  }>
> = (state, action) => {
  const { key, value } = action.payload
  const localStorage = state.result.localStorage ?? {}
  const newLocalStorage = {
    ...localStorage,
    [key]: value,
  }
  state.result.localStorage = newLocalStorage
  window.localStorage.setItem(
    CUSTOM_STORAGE_PREFIX,
    JSON.stringify(newLocalStorage),
  )
}

export const updateCurrentPagePathReducer: CaseReducer<
  ExecutionState,
  PayloadAction<UpdateCurrentPagePathPayload>
> = (state, action) => {
  const { pageDisplayName, subPagePath } = action.payload
  const rootNode = state.result.root
  if (!rootNode) return
  const pageSortedKey = rootNode.$childrenNode
  if (!Array.isArray(pageSortedKey)) return
  const currentIndex = pageSortedKey.findIndex(
    (pageName) => pageName === pageDisplayName,
  )
  if (currentIndex === -1) return
  const currentPageNode = state.result[pageDisplayName]
  const pageChildrenNodeDisplayName: string[] = currentPageNode.$childrenNode
  rootNode.currentSubPagePath = subPagePath
  rootNode.currentPageIndex = currentIndex
  if (subPagePath) {
    pageChildrenNodeDisplayName.forEach((sectionDisplayName) => {
      const sectionNode = state.result[sectionDisplayName]
      if (!sectionNode) return
      if (sectionNode.$widgetType === "MODAL_SECTION_NODE") return
      const sectionViewConfig = sectionNode.sectionViewConfigs.find(
        (config: Record<string, string>) => config.path === subPagePath,
      )
      let sectionIndex = sectionNode.viewSortedKey.findIndex(
        (viewDisplayName: string) =>
          viewDisplayName === sectionViewConfig?.viewDisplayName,
      )
      if (sectionIndex === -1) {
        const defaultViewPath = sectionNode.defaultViewKey
        const defaultSectionViewConfig = sectionNode.sectionViewConfigs.find(
          (config: Record<string, string>) => config.path === defaultViewPath,
        )
        sectionIndex = sectionNode.viewSortedKey.findIndex(
          (viewDisplayName: string) =>
            viewDisplayName === defaultSectionViewConfig?.viewDisplayName,
        )
        if (sectionIndex === -1) {
          sectionIndex = 0
        }
      }
      sectionNode.currentViewIndex = sectionIndex
    })
  } else {
    pageChildrenNodeDisplayName.forEach((sectionDisplayName) => {
      const sectionNode = state.result[sectionDisplayName]
      if (!sectionNode) return
      if (sectionNode.$widgetType === "MODAL_SECTION_NODE") return
      let sectionIndex = 0
      const defaultViewPath = sectionNode.defaultViewKey
      const defaultSectionViewConfig = sectionNode.sectionViewConfigs.find(
        (config: Record<string, string>) => config.path === defaultViewPath,
      )
      sectionIndex = sectionNode.viewSortedKey.findIndex(
        (viewDisplayName: string) =>
          viewDisplayName === defaultSectionViewConfig?.viewDisplayName,
      )
      if (sectionIndex === -1) {
        sectionIndex = 0
      }
      sectionNode.currentViewIndex = sectionIndex
    })
  }
}
