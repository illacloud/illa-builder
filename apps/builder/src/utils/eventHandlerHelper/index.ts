import copy from "copy-to-clipboard"
import { get, isNumber } from "lodash"
import { createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { getActionItemByDisplayName } from "@/redux/currentApp/action/actionSelector"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { SectionViewShape } from "@/redux/currentApp/editor/components/componentsState"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { UpdateExecutionByDisplayNamePayload } from "@/redux/currentApp/executionTree/executionState"
import { ILLARoute } from "@/router"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { hasDynamicStringSnippet } from "@/utils/evaluateDynamicString/utils"
import {
  goToURL,
  showNotification,
} from "@/utils/executionTreeHelper/ILLAUtils/"
import { downloadFileFromEventHandler } from "@/utils/file"
import { runOriginAction } from "../action/runAction"
import { LIMIT_MEMORY, estimateMemoryUsage } from "../calculateMemoryUsage"

const message = createMessage()

export const transformEvents = (
  event: any,
  globalData: Record<string, any>,
) => {
  if (!event) return
  const { actionType } = event
  if (actionType === "openUrl") {
    const { newTab, url, enabled } = event
    const params = { url: `${url}`, newTab }
    return {
      script: () => {
        goToURL(params)
      },
      enabled,
    }
  }
  if (actionType === "showNotification") {
    const { title, description, notificationType, duration, enabled } = event
    const params = {
      type: notificationType,
      title: `${title}`,
      description: `${description}`,
      duration: isNumber(duration) ? duration : undefined,
    }
    return {
      script: () => {
        showNotification(params)
      },
      enabled,
    }
  }
  if (actionType === "setGlobalState") {
    const {
      stateDisplayName,
      enabled,
      globalStateMethod,
      globalStateValue,
      globalStateKeyPath,
    } = event
    switch (globalStateMethod) {
      case "setIn": {
        const params = {
          key: stateDisplayName,
          path: globalStateKeyPath,
          value: globalStateValue,
        }

        return {
          script: () => {
            store.dispatch(
              executionActions.setInGlobalStateInExecutionReducer(params),
            )
          },
          enabled,
        }
      }
      case "setValue": {
        const params = { key: stateDisplayName, value: globalStateValue }

        return {
          script: () => {
            store.dispatch(
              executionActions.setGlobalStateInExecutionReducer(params),
            )
          },
          enabled,
        }
      }
    }
  }
  if (actionType === "setLocalStorage") {
    const { enabled, localStorageMethod } = event
    switch (localStorageMethod) {
      case "clear": {
        return {
          script: () => {
            store.dispatch(
              executionActions.clearLocalStorageInExecutionReducer(),
            )
          },
          enabled,
        }
      }
      case "setValue": {
        const { localStorageKey, localStorageValue } = event
        const params = { key: localStorageKey, value: localStorageValue }

        return {
          script: () => {
            store.dispatch(
              executionActions.setLocalStorageInExecutionReducer(params),
            )
          },
          enabled,
        }
      }
    }
  }

  if (actionType === "copyToClipboard") {
    const { copiedValue, enabled } = event
    return {
      script: () => {
        if (
          copiedValue === undefined ||
          copiedValue === null ||
          copiedValue === ""
        ) {
          message.info({
            content: i18n.t("empty_copied_tips"),
          })
          return
        }
        const memorySize = estimateMemoryUsage(copiedValue)
        if (LIMIT_MEMORY < memorySize) {
          message.info({
            content: i18n.t("editor.global.size_exceed", {
              current_size: memorySize,
              limit_size: LIMIT_MEMORY,
            }),
          })
          return
        }
        message.success({
          content: i18n.t("copied"),
        })
        if (
          typeof copiedValue === "string" ||
          typeof copiedValue === "number"
        ) {
          copy(String(copiedValue))
          return
        }
        copy(JSON.stringify(copiedValue))
      },
      enabled,
    }
  }

  if (actionType === "setRouter") {
    const { pagePath, viewPath, enabled } = event
    let finalPath = `/${pagePath}`
    finalPath = viewPath ? finalPath + `/${viewPath}` : finalPath
    return {
      script: () => {
        const originPath = window.location.pathname
        const originPathArray = originPath.split("/")
        const isProductionMode = getIsILLAProductMode(store.getState())
        const rootNodeProps = getRootNodeExecutionResult(store.getState())
        const { pageSortedKey } = rootNodeProps
        const index = pageSortedKey.findIndex(
          (path: string) => path === pagePath,
        )
        if (index === -1) return
        if (isProductionMode && originPathArray.length >= 5) {
          ILLARoute.navigate(
            originPathArray.slice(0, 5).join("/") + finalPath,
            { replace: true },
          )
        }
        const updateSlice: UpdateExecutionByDisplayNamePayload[] = [
          {
            displayName: "root",
            value: {
              currentPageIndex: index,
            },
          },
        ]
        if (viewPath) {
          const canvas = getCanvas(store.getState())
          if (!canvas) return
          const pageNode = searchDsl(canvas, pagePath)
          if (!pageNode) return
          pageNode.childrenNode.forEach((node) => {
            const sectionViewConfigs = node.props?.sectionViewConfigs || []
            const viewSortedKey = node.props?.viewSortedKey || []
            const findConfig = sectionViewConfigs.find(
              (config: SectionViewShape) => {
                return config.path === viewPath
              },
            )
            if (findConfig) {
              const viewDisplayName = findConfig.viewDisplayName
              const indexOfViewKey = viewSortedKey.findIndex(
                (key: string) => key === viewDisplayName,
              )
              if (indexOfViewKey !== -1) {
                updateSlice.push({
                  displayName: node.displayName,
                  value: {
                    currentViewIndex: indexOfViewKey,
                  },
                })
              }
            }
          })
        }
        store.dispatch(
          executionActions.updateExecutionByMultiDisplayNameReducer(
            updateSlice,
          ),
        )
      },
      enabled,
    }
  }
  if (actionType === "downloadFile") {
    const { fileData, fileType, fileName } = event

    return {
      script: () => {
        if ([undefined, null, ""].includes(fileData)) {
          return
        }
        downloadFileFromEventHandler(fileType, `${fileName}`, fileData)
      },
    }
  }
  if (actionType === "widget") {
    const { widgetID, widgetMethod, enabled } = event
    if (
      [
        "setValue",
        "setSelectedValue",
        "setVolume",
        "setVideoUrl",
        "setAudioUrl",
        "setImageUrl",
        "setFileUrl",
        "setStartValue",
        "setPrimaryValue",
        "setEndValue",
        "setSpeed",
        "seekTo",
        "setStartOfRange",
        "setEndOfRange",
        "setMarkers",
        "addEvent",
        "deleteEvent",
        "setStartTime",
        "setEndTime",
        "selectRow",
        "setValueInArray",
        "selectRow",
        "setValueInArray",
      ].includes(widgetMethod)
    ) {
      const { widgetTargetValue } = event
      return {
        script: () => {
          const method = get(globalData, `${widgetID}.${widgetMethod}`, null)
          if (method) {
            method(widgetTargetValue)
          }
        },
        enabled,
      }
    }
    if (
      ["setDisabled", "setLoop", "showControls", "mute"].includes(widgetMethod)
    ) {
      const { widgetSwitchTargetValue } = event
      return {
        script: () => {
          const method = get(globalData, `${widgetID}.${widgetMethod}`, null)
          if (method) {
            method(widgetSwitchTargetValue)
          }
        },
        enabled,
      }
    }
    if (
      widgetMethod === "play" ||
      widgetMethod === "pause" ||
      widgetMethod === "clearValue" ||
      widgetMethod === "clearValidation" ||
      widgetMethod === "clearSelection" ||
      widgetMethod === "clearFilters" ||
      widgetMethod === "toggle" ||
      widgetMethod === "focus" ||
      widgetMethod === "reset" ||
      widgetMethod === "rowSelect" ||
      widgetMethod === "resetPrimaryValue" ||
      widgetMethod === "slickNext" ||
      widgetMethod === "slickPrevious" ||
      widgetMethod === "resetValue" ||
      widgetMethod === "resetMarkers" ||
      widgetMethod === "onFreeTimeDragOrClick"
    ) {
      return {
        script: `{{${widgetID}.${widgetMethod}()}}`,
        enabled,
      }
    }
    if (widgetMethod === "setCurrentViewKey") {
      const { key } = event
      return {
        script: `{{${widgetID}.${widgetMethod}("${key}")}}`,
        enabled,
      }
    }
    if (widgetMethod === "setSort") {
      const { sortKey, sortOrder } = event
      return {
        script: () => {
          const method = get(globalData, `${widgetID}.${widgetMethod}`, null)
          if (method) {
            method(sortKey, sortOrder)
          }
        },
        enabled,
      }
    }
    if (widgetMethod === "setFilters") {
      const { filters, operator } = event
      return {
        script: () => {
          const method = get(globalData, `${widgetID}.${widgetMethod}`, null)
          if (method) {
            method(filters, operator)
          }
        },
        enabled,
      }
    }
    if (widgetMethod === "selectRow") {
      const { rowSelection } = event
      return {
        script: `{{${widgetID}.${widgetMethod}(${rowSelection})}}`,
        enabled,
      }
    }
    if (widgetMethod === "selectPage") {
      const { pageIndex } = event
      return {
        script: `{{${widgetID}.${widgetMethod}(${pageIndex})}}`,
        enabled,
      }
    }
    if (widgetMethod === "setCurrentViewIndex") {
      const { index } = event
      return {
        script: `{{${widgetID}.${widgetMethod}("${index}")}}`,
        enabled,
      }
    }
    if (widgetMethod === "showNextView") {
      const { showNextViewLoopBack } = event
      return {
        script: `{{${widgetID}.${widgetMethod}(${!!showNextViewLoopBack})}}`,
        enabled,
      }
    }
    if (widgetMethod === "showPreviousView") {
      const { showPreviousViewLoopBack } = event
      return {
        script: `{{${widgetID}.${widgetMethod}(${!!showPreviousViewLoopBack})}}`,
        enabled,
      }
    }

    if (widgetMethod === "showNextVisibleView") {
      const { showNextVisibleViewLoopBack } = event
      return {
        script: `{{${widgetID}.${widgetMethod}(${!!showNextVisibleViewLoopBack})}}`,
        enabled,
      }
    }

    if (widgetMethod === "showPreviousVisibleView") {
      const { showPreviousVisibleViewLoopBack } = event
      return {
        script: `{{${widgetID}.${widgetMethod}(${!!showPreviousVisibleViewLoopBack})}}`,
        enabled,
      }
    }
    if (widgetMethod === "submit") {
      return {
        script: `{{${widgetID}.${widgetMethod}()}}`,
        enabled,
      }
    }
    if (widgetMethod === "validate") {
      return {
        script: `{{${widgetID}.${widgetMethod}()}}`,
        enabled,
      }
    }

    if (widgetMethod === "openModal" || widgetMethod === "closeModal") {
      return {
        script: () => {
          store.dispatch(
            executionActions.updateModalDisplayReducer({
              display: widgetMethod === "openModal",
              displayName: widgetID,
            }),
          )
        },
        enabled,
      }
    }
  }
  if (actionType === "datasource") {
    const rootState = store.getState()
    const { queryID, enabled } = event
    const actionItem = getActionItemByDisplayName(rootState, queryID)
    if (!actionItem)
      return {
        script: `{{}}`,
        enabled,
      }
    return {
      script: () => {
        runOriginAction(actionItem)
      },
      enabled,
    }
  }
  return {
    script: `{{}}`,
    enabled: "{{false}}",
  }
}

export const runEventHandler = (
  scriptObj: any,
  globalData: Record<string, any>,
) => {
  const eventObj = transformEvents(scriptObj, globalData)
  if (!eventObj) return
  const { script, enabled } = eventObj
  if (enabled || enabled == undefined) {
    if (typeof script === "string" && hasDynamicStringSnippet(script)) {
      try {
        evaluateDynamicString("events", script, globalData)
      } catch (e) {
        message.error({
          content: "eventHandler run error",
        })
      }
      return
    }
    if (typeof script === "function") {
      script()
    }
  }
}
