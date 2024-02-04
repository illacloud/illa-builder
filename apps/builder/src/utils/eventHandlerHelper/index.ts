import { hasDynamicStringSnippet } from "@illa-public/dynamic-string"
import { get, isNumber } from "lodash-es"
import { createMessage } from "@illa-design/react"
import { getActionItemByDisplayName } from "@/redux/currentApp/action/actionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { runOriginAction } from "../action/runAction"
import { wrapperScriptCode } from "../evaluateDynamicString/valueConverter"
import { clearLocalStorage, setValueLocalStorage } from "./utils/localStorage"

export enum EVENT_ACTION_TYPE {
  OPEN_URL = "openUrl",
  SHOW_NOTIFICATION = "showNotification",
  SET_GLOBAL_STATE = "setGlobalState",
  SET_LOCAL_STORAGE = "setLocalStorage",
  COPY_TO_CLIPBOARD = "copyToClipboard",
  SET_ROUTER = "setRouter",
  DOWNLOAD_FILE = "downloadFile",
  WIDGET = "widget",
  DATA_SOURCE = "datasource",
  SCRIPT = "script",
  DOWNLOAD_FROM_ILLA_DRIVE = "downloadFromILLADrive",
  SAVE_TO_ILLA_DRIVE = "saveToILLADrive",
}

const message = createMessage()

export const transformEvents = (
  event: any,
  globalData: Record<string, any>,
) => {
  if (!event) return
  const { actionType } = event
  switch (actionType as EVENT_ACTION_TYPE) {
    case EVENT_ACTION_TYPE.OPEN_URL: {
      const { newTab, url, enabled } = event
      const params = { url, newTab }
      return {
        script: () => {
          globalData.utils.goToURL(params)
        },
        enabled,
      }
    }
    case EVENT_ACTION_TYPE.SHOW_NOTIFICATION: {
      const { title, description, notificationType, duration, enabled } = event
      const params = {
        type: notificationType,
        title: title,
        description: description,
        duration: isNumber(duration) ? duration : undefined,
      }
      return {
        script: () => {
          globalData.utils.showNotification(params)
        },
        enabled,
      }
    }

    case EVENT_ACTION_TYPE.COPY_TO_CLIPBOARD: {
      const { copiedValue, enabled } = event
      return {
        script: () => {
          globalData.utils.copyToClipboard(copiedValue)
        },
        enabled,
      }
    }
    case EVENT_ACTION_TYPE.SET_GLOBAL_STATE: {
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
              globalData.utils.setGlobalDataIn(params)
            },
            enabled,
          }
        }
        case "setValue": {
          const params = { key: stateDisplayName, value: globalStateValue }

          return {
            script: () => {
              globalData.utils.setGlobalDataValue(params)
            },
            enabled,
          }
        }
      }
    }
    case EVENT_ACTION_TYPE.SET_LOCAL_STORAGE: {
      const { enabled, localStorageMethod } = event
      switch (localStorageMethod) {
        case "clear": {
          return {
            script: () => {
              clearLocalStorage()
            },
            enabled,
          }
        }
        case "setValue": {
          const { localStorageKey, localStorageValue } = event
          const params = { key: localStorageKey, value: localStorageValue }

          return {
            script: () => {
              setValueLocalStorage(params)
            },
            enabled,
          }
        }
      }
      break
    }

    case EVENT_ACTION_TYPE.SET_ROUTER: {
      const { pagePath, viewPath, enabled } = event

      return {
        script: () => {
          globalData.utils.setRouter({
            pagePath,
            viewPath,
          })
        },
        enabled,
      }
    }
    case EVENT_ACTION_TYPE.DOWNLOAD_FILE: {
      const { fileData, fileType, fileName } = event

      return {
        script: () => {
          if ([undefined, null, ""].includes(fileData)) {
            return
          }
          globalData.utils.downloadFile({
            fileType,
            fileName,
            data: fileData,
          })
        },
      }
    }
    case EVENT_ACTION_TYPE.WIDGET: {
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
          "setSrc",
          "setFilterModel",
          "setColumnVisibilityModel",
          "setPage",
          "setPageSize",
          "setRowSelection",
          "renderEditor",
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
        ["setDisabled", "setLoop", "showControls", "mute"].includes(
          widgetMethod,
        )
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
        widgetMethod === "onFreeTimeDragOrClick" ||
        widgetMethod === "openScanner"
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
      return {
        script: `{{}}`,
        enabled: "{{false}}",
      }
    }
    case EVENT_ACTION_TYPE.DATA_SOURCE: {
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
    case EVENT_ACTION_TYPE.DOWNLOAD_FROM_ILLA_DRIVE: {
      const { downloadInfo, asZip, enabled } = event
      return {
        script: () => {
          globalData.utils.downloadFromILLADrive({
            downloadInfo,
            asZip,
          })
        },
        enabled,
      }
    }

    case EVENT_ACTION_TYPE.SAVE_TO_ILLA_DRIVE: {
      const {
        fileName,
        fileData,
        fileType,
        allowAnonymous,
        replace,
        folder,
        enabled,
      } = event

      return {
        script: () => {
          globalData.utils.saveToILLADrive({
            fileData,
            fileName,
            fileType,
            allowAnonymous,
            replace,
            folder,
          })
        },
        enabled,
      }
    }
    case EVENT_ACTION_TYPE.SCRIPT: {
      const { script, enabled } = event
      return {
        script: wrapperScriptCode(script, true),
        enabled,
      }
    }
    default: {
      return {
        script: `{{}}`,
        enabled: "{{false}}",
      }
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

  if (
    (typeof enabled === "boolean" && enabled) ||
    scriptObj.originEnable == undefined ||
    scriptObj.originEnable === ""
  ) {
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
