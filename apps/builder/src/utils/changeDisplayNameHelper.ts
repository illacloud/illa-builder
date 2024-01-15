import {
  convertPathToString,
  hasDynamicStringSnippet,
} from "@illa-public/dynamic-string"
import {
  ActionContent,
  ActionItem,
  ComponentMapNode,
} from "@illa-public/public-types"
import { get, toPath } from "lodash-es"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  Events,
  UpdateActionSlicePropsPayload,
} from "@/redux/currentApp/action/actionState"
import { UpdateComponentSlicePropsPayload } from "@/redux/currentApp/components/componentsPayload"
import { getComponentMap } from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import {
  getInDependenciesMap,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import store, { AppListenerEffectAPI } from "@/store"
import { EVENT_ACTION_TYPE } from "./eventHandlerHelper"
import { isAction, isWidget } from "./executionTreeHelper/utils"

const changeDisplayNameHelper = (
  independenciesMap: Record<string, string[]>,
  seeds: Record<string, any>,
  oldDisplayName: string,
  newDisplayName: string,
  type: "displayName" | "globalDataKey" = "displayName",
) => {
  const updateWidgetSlice: UpdateComponentSlicePropsPayload[] = []
  const updateActionSlice: UpdateActionSlicePropsPayload[] = []
  Object.keys(independenciesMap).forEach((inDepPath) => {
    const paths = toPath(inDepPath)
    if (
      (type === "displayName" && oldDisplayName === paths[0]) ||
      (type === "globalDataKey" && oldDisplayName === paths[1])
    ) {
      const usedPaths = independenciesMap[inDepPath]
      usedPaths.forEach((usedPath) => {
        const usedPathArray = toPath(usedPath)
        const displayName =
          usedPathArray[0] === oldDisplayName
            ? newDisplayName
            : usedPathArray[0]
        const finalUsedPathArray = [...usedPathArray]
        finalUsedPathArray.splice(0, 1, displayName)
        const finalUsedPath = convertPathToString(finalUsedPathArray)
        const maybeDynamicStringValue = get(seeds, finalUsedPath)
        if (hasDynamicStringSnippet(maybeDynamicStringValue)) {
          const newDynamicStringValue = maybeDynamicStringValue.replace(
            oldDisplayName,
            newDisplayName,
          )
          const propsPath = convertPathToString(usedPathArray.slice(1))
          const seed = seeds[displayName]
          if (isAction(seed)) {
            updateActionSlice.push({
              displayName: displayName,
              actionID: seed.$actionID,
              propsSlice: {
                [propsPath]: newDynamicStringValue,
              },
            })
          }
          if (isWidget(seed)) {
            updateWidgetSlice.push({
              displayName: displayName,
              propsSlice: {
                [propsPath]: newDynamicStringValue,
              },
            })
          }
        }
      })
    }
  })

  return { updateWidgetSlice, updateActionSlice }
}

const changeEventUsedDisplayNameHelper = (
  events: Record<string, unknown>[],
  oldDisplayName: string,
  newDisplayName: string,
  prefix: string,
) => {
  const propsSlice: {
    [x: string]: unknown
  } = {}
  events.forEach((event, index) => {
    if (event.widgetID === oldDisplayName) {
      const path = convertPathToString([prefix, index, "widgetID"])
      propsSlice[path] = newDisplayName
    }

    if (event.queryID === oldDisplayName) {
      const path = convertPathToString([prefix, index, "queryID"])
      propsSlice[path] = newDisplayName
    }

    if (event.stateDisplayName === oldDisplayName) {
      const path = convertPathToString([prefix, index, "stateDisplayName"])
      propsSlice[path] = newDisplayName
    }

    if (event.actionType === EVENT_ACTION_TYPE.SET_ROUTER) {
      if (event.pagePath === oldDisplayName) {
        const path = convertPathToString([prefix, index, "pagePath"])
        propsSlice[path] = newDisplayName
      }
      if (event.viewPath === oldDisplayName) {
        const path = convertPathToString([prefix, index, "viewPath"])
        propsSlice[path] = newDisplayName
      }
    }
  })
  return propsSlice
}

const changeEventHandlerReferenceHelper = (
  oldDisplayName: string,
  newDisplayName: string,
  actionLists: ActionItem<ActionContent>[],
  componentMaps: Record<string, ComponentMapNode>,
) => {
  const updateWidgetSlice: UpdateComponentSlicePropsPayload[] = []
  const updateActionSlice: UpdateActionSlicePropsPayload[] = []

  actionLists.forEach((action) => {
    const { content } = action
    const { successEvent, failedEvent } = content as ActionContent & Events
    if (Array.isArray(successEvent)) {
      const prefix = "content.successEvent"
      const propsSlice = changeEventUsedDisplayNameHelper(
        successEvent,
        oldDisplayName,
        newDisplayName,
        prefix,
      )
      updateActionSlice.push({
        displayName: action.displayName,
        actionID: action.actionID,
        propsSlice: propsSlice,
      })
    }

    if (Array.isArray(failedEvent)) {
      const prefix = "content.failedEvent"

      const propsSlice = changeEventUsedDisplayNameHelper(
        failedEvent,
        oldDisplayName,
        newDisplayName,
        prefix,
      )
      updateActionSlice.push({
        displayName: action.displayName,
        actionID: action.actionID,
        propsSlice: propsSlice,
      })
    }
  })

  Object.values(componentMaps).forEach((componentMap) => {
    const { props } = componentMap
    if (Array.isArray(props?.events)) {
      const prefix = "events"
      const propsSlice = changeEventUsedDisplayNameHelper(
        props.events,
        oldDisplayName,
        newDisplayName,
        prefix,
      )
      updateWidgetSlice.push({
        displayName: componentMap.displayName,
        propsSlice: propsSlice,
      })
    }
  })
  return { updateWidgetSlice, updateActionSlice }
}

const mergeUpdateSlice = (
  updateWidgetSlice: UpdateComponentSlicePropsPayload[],
  updateActionSlice: UpdateActionSlicePropsPayload[],
) => {
  const updateWidgetSliceMap: Record<string, UpdateComponentSlicePropsPayload> =
    {}

  updateWidgetSlice.forEach((item) => {
    const { displayName } = item
    if (updateWidgetSliceMap[displayName]) {
      updateWidgetSliceMap[displayName].propsSlice = {
        ...updateWidgetSliceMap[displayName].propsSlice,
        ...item.propsSlice,
      }
    } else {
      updateWidgetSliceMap[displayName] = item
    }
  })

  const updateActionSliceMap: Record<string, UpdateActionSlicePropsPayload> = {}

  updateActionSlice.forEach((item) => {
    const { displayName } = item
    if (updateActionSliceMap[displayName]) {
      updateActionSliceMap[displayName].propsSlice = {
        ...updateActionSliceMap[displayName].propsSlice,
        ...item.propsSlice,
      }
    } else {
      updateActionSliceMap[displayName] = item
    }
  })

  return {
    updateWidgetSlice: Object.values(updateWidgetSliceMap),
    updateActionSlice: Object.values(updateActionSliceMap),
  }
}

export const mixedChangeDisplayNameHelper = (
  listenerApi: AppListenerEffectAPI,
  oldDisplayName: string,
  newDisplayName: string,
  type: "displayName" | "globalDataKey" = "displayName",
) => {
  const rootState = listenerApi.getState()
  const independenciesMap = getInDependenciesMap(rootState)
  const seeds = getRawTree(rootState)
  const { updateActionSlice, updateWidgetSlice } = changeDisplayNameHelper(
    independenciesMap,
    seeds,
    oldDisplayName,
    newDisplayName,
    type,
  )
  const {
    updateActionSlice: updateActionEventSlice,
    updateWidgetSlice: updateWidgetEventSlice,
  } = changeEventHandlerReferenceHelper(
    oldDisplayName,
    newDisplayName,
    getActionList(rootState),
    getComponentMap(rootState),
  )

  const contactedUpdateActionSlices = updateActionSlice.concat(
    ...updateActionEventSlice,
  )
  const contactedUpdateWidgetSlice = updateWidgetSlice.concat(
    ...updateWidgetEventSlice,
  )

  const {
    updateActionSlice: mergedActionSlice,
    updateWidgetSlice: mergedWidgetSlice,
  } = mergeUpdateSlice(contactedUpdateWidgetSlice, contactedUpdateActionSlices)
  listenerApi.dispatch(
    componentsActions.batchUpdateMultiComponentSlicePropsReducer(
      mergedWidgetSlice,
    ),
  )
  listenerApi.dispatch(
    actionActions.batchUpdateMultiActionSlicePropsReducer(mergedActionSlice),
  )
}

export const copyWidgetDisplayNameHelper = (
  oldDisplayName: string,
  newDisplayName: string,
) => {
  const rootState = store.getState()
  const independenciesMap = getInDependenciesMap(rootState)
  const seeds = getRawTree(rootState)
  const updatePathsMapValue: Record<string, unknown> = {}
  Object.keys(independenciesMap).forEach((inDepPath) => {
    const usedPaths = independenciesMap[inDepPath]
    usedPaths.forEach((usedPath) => {
      const usedPathArray = toPath(usedPath)
      const displayName = usedPathArray[0]
      if (displayName !== oldDisplayName) {
        return
      }
      const finalUsedPathArray = [...usedPathArray]
      const finalUsedPath = convertPathToString(finalUsedPathArray)
      const maybeDynamicStringValue = get(seeds, finalUsedPath)
      if (hasDynamicStringSnippet(maybeDynamicStringValue)) {
        const newDynamicStringValue = maybeDynamicStringValue.replace(
          oldDisplayName,
          newDisplayName,
        )
        const propsPath = convertPathToString(usedPathArray.slice(1))
        updatePathsMapValue[propsPath] = newDynamicStringValue
      }
    })
  })

  return updatePathsMapValue
}
