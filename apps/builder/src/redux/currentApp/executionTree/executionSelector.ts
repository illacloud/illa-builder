import { createSelector } from "@reduxjs/toolkit"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getAllComponentDisplayNameMapProps } from "@/redux/currentApp/editor/components/componentsSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { RawTreeFactory } from "@/utils/executionTreeHelper/rawTreeFactory"
import { RootState } from "@/store"

export const getRawTree = createSelector(
  [
    getActionList,
    getAllComponentDisplayNameMapProps,
    getCurrentUser,
    getBuilderInfo,
  ],
  (actions, widgets, currentUserInfo, builderInfo) => {
    return RawTreeFactory.create({
      actions: actions ?? [],
      widgets: widgets ?? {},
      currentUserInfo,
      builderInfo,
    })
  },
)

export const getExecution = (state: RootState) => state.currentApp.execution

export const getExecutionResult = createSelector(
  [getExecution],
  execution => execution.result,
)

export const getExecutionError = createSelector(
  [getExecution],
  execution => execution.error ?? {},
)

export const getExecutionDebuggerData = createSelector(
  [getExecution],
  execution => execution.debuggerData ?? {},
)

export const getWidgetExecutionResult = createSelector(
  [getExecutionResult],
  executionResult => {
    const widgetExecutionResult: Record<string, any> = {}
    Object.keys(executionResult).forEach(key => {
      const widgetOrAction = executionResult[key]
      if (widgetOrAction.$type === "WIDGET") {
        widgetExecutionResult[key] = widgetOrAction
      }
    })
    return widgetExecutionResult
  },
)

export const getWidgetExecutionResultArray = createSelector(
  [getWidgetExecutionResult],
  widgetExecutionResult => {
    const widgetExecutionResultArray: Record<string, any>[] = []
    Object.keys(widgetExecutionResult).forEach(key => {
      widgetExecutionResultArray.push({
        ...widgetExecutionResult[key],
        displayName: key,
      })
    })
    return widgetExecutionResultArray
  },
)

export const getActionExecutionResult = createSelector(
  [getExecutionResult],
  executionResult => {
    const actionExecutionResult: Record<string, any> = {}
    Object.keys(executionResult).forEach(key => {
      const widgetOrAction = executionResult[key]
      if (widgetOrAction.$type === "ACTION") {
        actionExecutionResult[key] = widgetOrAction
      }
    })
    return actionExecutionResult
  },
)

export const getActionExecutionResultArray = createSelector(
  [getActionExecutionResult],
  actionExecutionResult => {
    const actionExecutionResultArray: Record<string, any>[] = []
    Object.keys(actionExecutionResult).forEach(key => {
      actionExecutionResultArray.push({
        ...actionExecutionResult[key],
        displayName: key,
      })
    })
    return actionExecutionResultArray
  },
)
